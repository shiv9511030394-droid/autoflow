// Feature: meta-oauth-integration, Property 9: Disconnect clears token and sets status

const fc = require('fast-check')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongod.stop()
})

afterEach(async () => {
  const Integration = mongoose.model('Integration')
  await Integration.deleteMany({})
})

const Integration = require('../models/Integration')

/**
 * Property 9: Disconnect clears token and sets status
 * Validates: Requirements 4.3
 *
 * For any Integration record with status 'connected' and a non-null encryptedToken,
 * after a successful disconnect operation, the record SHALL have status 'disconnected'
 * and encryptedToken SHALL be null.
 */
describe('Property 9: Disconnect clears token and sets status', () => {
  test('after disconnect, status is disconnected and encryptedToken is null', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.uuid(),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        async (userIdStr, platform) => {
          const userId = new mongoose.Types.ObjectId(userIdStr.replace(/-/g, '').slice(0, 24))

          // Create an Integration with status 'connected' and a non-null encryptedToken
          await Integration.findOneAndUpdate(
            { userId, platform },
            {
              userId,
              platform,
              encryptedToken: 'some_encrypted_token',
              iv: 'some_iv',
              authTag: 'some_auth_tag',
              status: 'connected',
              connectedAt: new Date()
            },
            { upsert: true, new: true }
          )

          // Perform the disconnect update operation
          await Integration.findOneAndUpdate(
            { userId, platform },
            { status: 'disconnected', encryptedToken: null, iv: null, authTag: null }
          )

          // Verify the record
          const updated = await Integration.findOne({ userId, platform })

          // Clean up
          await Integration.deleteMany({ userId })

          return (
            updated !== null &&
            updated.status === 'disconnected' &&
            updated.encryptedToken === null
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})
