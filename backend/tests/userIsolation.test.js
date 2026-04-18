// Feature: meta-oauth-integration, Property 8: User isolation

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
 * Property 8: User isolation
 * Validates: Requirements 5.1
 *
 * For any two distinct userIds A and B, querying integrations for userId A
 * SHALL never return any Integration document whose userId equals B.
 */
describe('Property 8: User isolation', () => {
  test('querying integrations for user A never returns documents belonging to user B', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.uuid(),
        fc.uuid(),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        async (uuidA, uuidB, platform) => {
          // Ensure distinct userIds — skip if same uuid generated
          fc.pre(uuidA !== uuidB)

          const userIdA = new mongoose.Types.ObjectId(uuidA.replace(/-/g, '').slice(0, 24))
          const userIdB = new mongoose.Types.ObjectId(uuidB.replace(/-/g, '').slice(0, 24))

          // Store a record for user B
          await Integration.create({
            userId: userIdB,
            platform,
            status: 'connected',
            connectedAt: new Date()
          })

          // Query for user A
          const results = await Integration.find({ userId: userIdA })

          // None of the results should belong to user B
          const isolated = results.every(
            doc => doc.userId.toString() !== userIdB.toString()
          )

          // Clean up
          await Integration.deleteMany({ userId: { $in: [userIdA, userIdB] } })

          return isolated
        }
      ),
      { numRuns: 100 }
    )
  })
})
