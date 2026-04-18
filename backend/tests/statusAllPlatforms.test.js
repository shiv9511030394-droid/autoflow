// Feature: meta-oauth-integration, Property 10: Status endpoint always returns all platforms

const fc = require('fast-check')
const { buildStatusResponse } = require('../lib/integrationHelpers')

/**
 * Property 10: Status endpoint always returns all platforms
 * Validates: Requirements 3.2
 *
 * For any authenticated user (regardless of which platforms are connected),
 * the status response SHALL contain entries for all three platforms:
 * instagram, facebook, and whatsapp.
 */
describe('Property 10: Status endpoint always returns all platforms', () => {
  test('response always contains instagram, facebook, and whatsapp regardless of connected subset', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('instagram', 'facebook', 'whatsapp'), { minLength: 0, maxLength: 3 }),
        (connectedPlatforms) => {
          // Deduplicate
          const unique = [...new Set(connectedPlatforms)]

          // Build fake integration docs for the connected subset
          const integrations = unique.map(platform => ({
            platform,
            status: 'connected',
            connectedAt: new Date()
          }))

          const status = buildStatusResponse(integrations)

          return (
            'instagram' in status &&
            'facebook' in status &&
            'whatsapp' in status
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})
