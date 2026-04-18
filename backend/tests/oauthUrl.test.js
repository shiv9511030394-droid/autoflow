// Feature: meta-oauth-integration, Property 1: OAuth URL contains required parameters for any platform

const fc = require('fast-check')

// Set required env vars before requiring the module
process.env.META_APP_ID = '992279893125717'
process.env.ENCRYPTION_KEY = 'e51b000413303a38d37876a0b13bf49c390ae36b5c2e3c6ca0a703aebf2338a9'

const { buildOAuthUrl } = require('../lib/integrationHelpers')

const PLATFORM_SCOPES = {
  instagram: ['instagram_basic', 'instagram_manage_messages', 'pages_show_list'],
  facebook:  ['pages_messaging', 'pages_show_list', 'pages_manage_metadata'],
  whatsapp:  ['whatsapp_business_management', 'whatsapp_business_messaging']
}

/**
 * Property 1: OAuth URL contains required parameters for any platform
 * Validates: Requirements 1.2, 1.3, 6.1, 6.2, 6.3
 *
 * For any valid platform, the constructed OAuth URL SHALL contain:
 * client_id, redirect_uri, response_type=code, state, and the correct scope string.
 */
describe('Property 1: OAuth URL contains required parameters for any platform', () => {
  test('URL contains all required parameters for any valid platform', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('instagram', 'facebook', 'whatsapp'),
        fc.stringMatching(/^[0-9a-f]{64}$/),
        (platform, state) => {
          const url = buildOAuthUrl(platform, state)
          const parsed = new URL(url)
          const params = parsed.searchParams

          // Must have client_id
          if (!params.get('client_id')) return false

          // Must have redirect_uri
          if (!params.get('redirect_uri')) return false

          // Must have response_type=code
          if (params.get('response_type') !== 'code') return false

          // Must have state containing the state value
          const stateParam = params.get('state')
          if (!stateParam || !stateParam.includes(state)) return false

          // Must have correct scopes for the platform
          const scope = params.get('scope')
          const expectedScopes = PLATFORM_SCOPES[platform]
          for (const s of expectedScopes) {
            if (!scope.includes(s)) return false
          }

          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
