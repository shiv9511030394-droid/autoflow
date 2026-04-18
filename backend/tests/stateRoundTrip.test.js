// Feature: meta-oauth-integration, Property 2: State parameter round-trip

const fc = require('fast-check')

process.env.META_APP_ID = '992279893125717'
process.env.ENCRYPTION_KEY = 'e51b000413303a38d37876a0b13bf49c390ae36b5c2e3c6ca0a703aebf2338a9'

const { encodeStateParam, decodeStateParam } = require('../lib/integrationHelpers')

/**
 * Property 2: State parameter round-trip
 * Validates: Requirements 1.3
 *
 * For any platform and state string, encoding state+platform into the OAuth
 * state parameter and then decoding it SHALL recover both values exactly.
 */
describe('Property 2: State parameter round-trip', () => {
  test('encoding and decoding state+platform recovers both values exactly', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        (state, platform) => {
          // Skip states that contain colons since the encoding uses colon as separator
          // and the platform names never contain colons, so splitting on last colon is safe
          const encoded = encodeStateParam(state, platform)
          const decoded = decodeStateParam(encoded)

          if (!decoded) return false

          return decoded.state === state && decoded.platform === platform
        }
      ),
      { numRuns: 100 }
    )
  })
})
