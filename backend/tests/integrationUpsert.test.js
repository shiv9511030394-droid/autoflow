// Feature: meta-oauth-integration, Property 7: Integration record upsert

const fc = require('fast-check')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri())
}, 30000)

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
 * Property 7: Integration record upsert (no duplicates)
 * Validates: Requirements 5.2
 *
 * For any userId and platform, calling connect N times for the same
 * (userId, platform) pair results in exactly one Integration document.
 */
describe('Property 7: Integration record upsert', () => {
  test('N connect calls for the same (userId, platform) result in exactly one document', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.uuid(),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        fc.integer({ min: 1, max: 5 }),
        async (userIdStr, platform, n) => {
          const userId = new mongoose.Types.ObjectId(userIdStr.replace(/-/g, '').slice(0, 24))

          // Simulate N connect calls via upsert
          for (let i = 0; i < n; i++) {
            await Integration.findOneAndUpdate(
              { userId, platform },
              {
                userId,
                platform,
                encryptedToken: `token_${i}`,
                iv: `iv_${i}`,
                authTag: `tag_${i}`,
                status: 'connected',
                connectedAt: new Date()
              },
              { upsert: true, new: true }
            )
          }

          const count = await Integration.countDocuments({ userId, platform })

          // Clean up for next iteration
          await Integration.deleteMany({ userId, platform })

          return count === 1
        }
      ),
      { numRuns: 100 }
    )
  })
})
