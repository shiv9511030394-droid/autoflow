// Feature: meta-oauth-integration, Property 4: State invalidation after use

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
  const OAuthState = mongoose.model('OAuthState')
  await OAuthState.deleteMany({})
})

const OAuthState = require('../models/OAuthState')

/**
 * Property 4: State invalidation after use
 * Validates: Requirements 7.4
 *
 * For any state parameter that has been verified once (findOneAndDelete),
 * attempting to find the same state a second time SHALL return null.
 */
describe('Property 4: State invalidation after use', () => {
  test('verifying a state parameter a second time fails with not-found', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.stringMatching(/^[0-9a-f]{64}$/),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        async (state, platform) => {
          const userId = new mongoose.Types.ObjectId()

          // Create the OAuthState document
          await OAuthState.create({ userId, state, platform })

          // First verification: find and delete (simulating callback)
          const first = await OAuthState.findOneAndDelete({ state })
          if (!first) return false // Should have been found

          // Second verification: should return null
          const second = await OAuthState.findOneAndDelete({ state })
          return second === null
        }
      ),
      { numRuns: 100 }
    )
  })
})
