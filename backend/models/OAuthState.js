const mongoose = require('mongoose')

const oauthStateSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state:     { type: String, required: true, unique: true },
  platform:  { type: String, enum: ['instagram', 'facebook', 'whatsapp'], required: true },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000) }
})

oauthStateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('OAuthState', oauthStateSchema)
