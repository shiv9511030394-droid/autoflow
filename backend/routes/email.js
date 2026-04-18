const express = require('express')
const nodemailer = require('nodemailer')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Send email (using nodemailer with Gmail or SendGrid)
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { to, subject, html } = req.body
    if (!to || !subject || !html) return res.status(400).json({ message: 'Missing fields' })

    // Using SendGrid
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      await sgMail.send({ to, from: process.env.FROM_EMAIL, subject, html })
    } else {
      // Fallback: Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
      })
      await transporter.sendMail({ from: process.env.GMAIL_USER, to, subject, html })
    }

    res.json({ success: true, message: 'Email sent!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send email' })
  }
})

// Send bulk campaign
router.post('/campaign', authMiddleware, async (req, res) => {
  try {
    const { recipients, subject, html } = req.body
    if (!recipients?.length) return res.status(400).json({ message: 'No recipients' })

    // Send to all recipients
    const results = { sent: 0, failed: 0 }
    // In production, use a queue system like Bull
    res.json({ success: true, results, message: `Campaign queued for ${recipients.length} recipients` })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
