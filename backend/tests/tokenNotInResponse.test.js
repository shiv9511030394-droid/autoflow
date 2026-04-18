// Feature: meta-oauth-integration, Property 11: Access token never appears in API responses

const fc = require('fast-check')

process.env.META_APP_ID = '992279893125717'
process.env.ENCRYPTION_KEY = 'e51b000413303a38d37876a0b13bf49c390ae36b5c2e3c6ca0a703aebf2338a9'

const { buildStatusResponse } = require('../lib/integrationHelpers')

/**
 * Property 11: Access token never appears in API responses
 * Validates: Requirements 7.1
 *
 * For any Integration record with a non-null encryptedToken, the JSON body
 * of any response from any /api/integrations/* endpoint SHALL NOT contain
 * the decrypted token value. Also verifies that encryptedToken, iv, and
 * authTag fields are never present in the status response.
 */
describe('Property 11: Access token never appears in API responses', () => {
  test('buildStatusResponse JSON does not contain encryptedToken values', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 20 }),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        (token, platform) => {
          // Simulate an Integration doc with an encryptedToken
          const integrations = [
            {
              platform,
              status: 'connected',
              connectedAt: new Date(),
              encryptedToken: token,
              iv: 'someiv',
              authTag: 'someauthtag'
            }
          ]

          const status = buildStatusResponse(integrations)
          const json = JSON.stringify(status)

          // The token value must not appear in the response
          return !json.includes(token)
        }
      ),
      { numRuns: 100 }
    )
  })

  test('buildStatusResponse never includes encryptedToken, iv, or authTag fields', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 20 }),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        (token, platform) => {
          const integrations = [
            {
              platform,
              status: 'connected',
              connectedAt: new Date(),
              encryptedToken: token,
              iv: 'someiv',
              authTag: 'someauthtag'
            }
          ]

          const status = buildStatusResponse(integrations)
          const json = JSON.stringify(status)

          return (
            !json.includes('encryptedToken') &&
            !json.includes('"iv"') &&
            !json.includes('authTag')
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})
