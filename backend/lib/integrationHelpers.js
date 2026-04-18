/**
 * Pure helper functions for the Meta OAuth integration.
 * Extracted into a separate module so they can be unit-tested
 * without pulling in Express, Mongoose, or other side-effectful dependencies.
 */

const VALID_PLATFORMS = ['instagram', 'facebook', 'whatsapp']

const PLATFORM_SCOPES = {
  instagram: ['instagram_basic', 'instagram_manage_messages', 'pages_show_list'],
  facebook:  ['pages_messaging', 'pages_show_list', 'pages_manage_metadata'],
  whatsapp:  ['whatsapp_business_management', 'whatsapp_business_messaging']
}

const REDIRECT_URI = 'https://autoflow-api.vercel.app/api/integrations/meta/callback'
const FRONTEND_URL = 'https://autoflow-ecru.vercel.app/integrations'

/**
 * Encode state and platform into the OAuth state parameter.
 * Format: <state>:<platform>
 */
function encodeStateParam(state, platform) {
  return `${state}:${platform}`
}

/**
 * Decode the OAuth state parameter back into state and platform.
 * Splits on the last colon to handle any colons in the state string.
 * @returns {{ state: string, platform: string } | null}
 */
function decodeStateParam(stateParam) {
  if (!stateParam) return null
  const lastColon = stateParam.lastIndexOf(':')
  if (lastColon === -1) return null
  const state = stateParam.slice(0, lastColon)
  const platform = stateParam.slice(lastColon + 1)
  return { state, platform }
}

/**
 * Build the Meta OAuth authorization URL for a given platform and state.
 * Pure function — no side effects, no DB or Express dependencies.
 * @param {string} platform
 * @param {string} state
 * @returns {string} full OAuth URL
 */
function buildOAuthUrl(platform, state) {
  const scopes = PLATFORM_SCOPES[platform]
  const params = new URLSearchParams({
    client_id:     process.env.META_APP_ID,
    redirect_uri:  REDIRECT_URI,
    scope:         scopes.join(','),
    response_type: 'code',
    state:         encodeStateParam(state, platform)
  })
  return `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`
}

/**
 * Build the status response object from an array of Integration documents.
 * Returns entries for all three platforms; defaults to disconnected for missing ones.
 * Never includes encryptedToken, iv, or authTag.
 * @param {Array} integrations
 * @returns {object}
 */
function buildStatusResponse(integrations) {
  const result = {}
  for (const platform of VALID_PLATFORMS) {
    result[platform] = { status: 'disconnected', connectedAt: null }
  }
  for (const integration of integrations) {
    if (VALID_PLATFORMS.includes(integration.platform)) {
      result[integration.platform] = {
        status:      integration.status,
        connectedAt: integration.connectedAt || null
      }
    }
  }
  return result
}

module.exports = {
  VALID_PLATFORMS,
  PLATFORM_SCOPES,
  REDIRECT_URI,
  FRONTEND_URL,
  encodeStateParam,
  decodeStateParam,
  buildOAuthUrl,
  buildStatusResponse
}
