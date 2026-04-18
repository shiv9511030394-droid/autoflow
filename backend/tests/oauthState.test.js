// Feature: meta-oauth-integration, Property 3: State storage and retrieval

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

// Require model after mongoose is set up
const OAuthState = require('../models/OAuthState')

/**
 * Property 3: State storage and retrieval
 * Validates: Requirements 1.4
 *
 * For any userId and state value, storing an OAuthState document and then
 * querying by that state value SHALL return the same userId and platform.
 */
describe('Property 3: State storage and retrieval', () => {
  test('querying by state returns the same userId and platform that were stored', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.uuid(),
        fc.stringMatching(/^[0-9a-f]{64}$/),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        async (userIdStr, state, platform) => {
          const userId = new mongoose.Types.ObjectId(userIdStr.replace(/-/g, '').slice(0, 24))

          await OAuthState.create({ userId, state, platform })

          const found = await OAuthState.findOne({ state })

          const result =
            found !== null &&
            found.userId.toString() === userId.toString() &&
            found.platform === platform

          // Clean up for next iteration
          await OAuthState.deleteOne({ state })

          return result
        }
      ),
      { numRuns: 100 }
    )
  })
})
