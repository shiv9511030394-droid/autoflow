const mongoose = require('mongoose')

const integrationSchema = new mongoose.Schema({
  userId:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  platform:       { type: String, enum: ['instagram', 'facebook', 'whatsapp'], required: true },
  encryptedToken: { type: String },
  iv:             { type: String },
  authTag:        { type: String },
  expiresAt:      { type: Date },
  status:         { type: String, enum: ['connected', 'disconnected', 'expired'], default: 'disconnected' },
  connectedAt:    { type: Date }
})

integrationSchema.index({ userId: 1, platform: 1 }, { unique: true })

module.exports = mongoose.model('Integration', integrationSchema)
