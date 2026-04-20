const express = require('express')
const crypto = require('crypto')
const authMiddleware = require('../middleware/auth')
const OAuthState = require('../models/OAuthState')
const Integration = require('../models/Integration')
const encryption = require('../lib/encryption')
const {
  VALID_PLATFORMS,
  FRONTEND_URL,
  encodeStateParam,
  decodeStateParam,
  buildOAuthUrl,
  buildStatusResponse
} = require('../lib/integrationHelpers')

const router = express.Router()

// GET /meta/connect
router.get('/meta/connect', async (req, res) => {
  try {
    // Accept token from query param (for OAuth redirect flow) or Authorization header
    let userId = null
    const tokenFromQuery = req.query.token
    const tokenFromHeader = req.headers.authorization?.split(' ')[1]
    const token = tokenFromQuery || tokenFromHeader

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    try {
      const jwt = require('jsonwebtoken')
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      userId = decoded.userId
    } catch {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const { platform } = req.query
    if (!VALID_PLATFORMS.includes(platform)) {
      return res.status(400).json({ message: 'Invalid platform. Must be one of: instagram, facebook, whatsapp' })
    }

    const state = crypto.randomBytes(32).toString('hex')
    await OAuthState.create({ userId, state, platform })

    const url = buildOAuthUrl(platform, state)
    return res.redirect(url)
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
})

// GET /meta/callback
router.get('/meta/callback', async (req, res) => {
  const { code, state: stateParam, error } = req.query

  if (error) {
    return res.redirect(`${FRONTEND_URL}?error=${encodeURIComponent(error)}`)
  }

  const parsed = decodeStateParam(stateParam || '')
  if (!parsed) {
    return res.redirect(`${FRONTEND_URL}?error=invalid_state`)
  }

  const { state, platform } = parsed

  // Look up and delete the OAuthState (invalidate after use)
  const oauthState = await OAuthState.findOneAndDelete({ state })
  if (!oauthState) {
    return res.redirect(`${FRONTEND_URL}?error=invalid_state`)
  }

  const userId = oauthState.userId

  try {
    // Exchange code for short-lived token
    const tokenParams = new URLSearchParams({
      client_id:     process.env.META_APP_ID,
      client_secret: process.env.META_APP_SECRET,
      redirect_uri:  'https://autoflow-api.vercel.app/api/integrations/meta/callback',
      code
    })
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?${tokenParams.toString()}`
    )
    const tokenData = await tokenRes.json()

    if (tokenData.error) {
      return res.redirect(`${FRONTEND_URL}?error=token_exchange_failed`)
    }

    const shortLivedToken = tokenData.access_token

    // Exchange short-lived token for long-lived token
    const longLivedParams = new URLSearchParams({
      grant_type:        'fb_exchange_token',
      client_id:         process.env.META_APP_ID,
      client_secret:     process.env.META_APP_SECRET,
      fb_exchange_token: shortLivedToken
    })
    const longLivedRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?${longLivedParams.toString()}`
    )
    const longLivedData = await longLivedRes.json()

    if (longLivedData.error) {
      return res.redirect(`${FRONTEND_URL}?error=token_exchange_failed`)
    }

    const longLivedToken = longLivedData.access_token
    const expiresIn = longLivedData.expires_in
    const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null

    // Encrypt the long-lived token
    const { ciphertext: encryptedToken, iv, authTag } = encryption.encrypt(longLivedToken)

    // Upsert Integration record
    await Integration.findOneAndUpdate(
      { userId, platform },
      { encryptedToken, iv, authTag, expiresAt, status: 'connected', connectedAt: new Date() },
      { upsert: true, new: true }
    )

    return res.redirect(`${FRONTEND_URL}?success=${encodeURIComponent(platform)}`)
  } catch (err) {
    return res.redirect(`${FRONTEND_URL}?error=token_exchange_failed`)
  }
})

// GET /meta/status
router.get('/meta/status', authMiddleware, async (req, res) => {
  try {
    const integrations = await Integration.find({ userId: req.userId })
    return res.json(buildStatusResponse(integrations))
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /meta/:platform
router.delete('/meta/:platform', authMiddleware, async (req, res) => {
  try {
    const { platform } = req.params
    if (!VALID_PLATFORMS.includes(platform)) {
      return res.status(400).json({ message: 'Invalid platform. Must be one of: instagram, facebook, whatsapp' })
    }

    const integration = await Integration.findOne({ userId: req.userId, platform })
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' })
    }

    await Integration.findOneAndUpdate(
      { userId: req.userId, platform },
      { status: 'disconnected', encryptedToken: null, iv: null, authTag: null }
    )

    return res.status(200).json({ message: 'Disconnected' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
