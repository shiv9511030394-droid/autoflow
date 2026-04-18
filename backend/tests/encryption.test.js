// Feature: meta-oauth-integration, Property 6: Token encryption round-trip

const fc = require('fast-check')

// Set the encryption key before requiring the module
process.env.ENCRYPTION_KEY = 'e51b000413303a38d37876a0b13bf49c390ae36b5c2e3c6ca0a703aebf2338a9'

const { encrypt, decrypt } = require('../lib/encryption')

/**
 * Property 6: Token encryption round-trip
 * Validates: Requirements 5.3, 5.4
 *
 * For any non-empty access token string:
 *   - decrypt(encrypt(token)) equals the original token
 *   - encrypt(token) does not equal the original token
 */
describe('Property 6: Token encryption round-trip', () => {
  test('decrypt(encrypt(token)) returns the original token for any non-empty string', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (token) => {
        const { ciphertext, iv, authTag } = encrypt(token)
        const decrypted = decrypt(ciphertext, iv, authTag)
        return decrypted === token
      }),
      { numRuns: 100 }
    )
  })

  test('encrypt(token) ciphertext does not equal the original token', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (token) => {
        const { ciphertext } = encrypt(token)
        return ciphertext !== token
      }),
      { numRuns: 100 }
    )
  })
})
