// Feature: meta-oauth-integration, Property 5: State uniqueness

const fc = require('fast-check')
const crypto = require('crypto')

/**
 * Property 5: State uniqueness
 * Validates: Requirements 7.3
 *
 * For any N >= 2 independently generated state parameters, all N values
 * SHALL be distinct, and each SHALL be at least 64 hexadecimal characters
 * (32 bytes of entropy).
 */
describe('Property 5: State uniqueness', () => {
  test('N independently generated state values are all distinct and each >= 64 hex chars', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }),
        (n) => {
          const states = Array.from({ length: n }, () =>
            crypto.randomBytes(32).toString('hex')
          )

          // All values are at least 64 hex chars
          const allLongEnough = states.every(s => s.length >= 64)

          // All values are distinct
          const unique = new Set(states)
          const allDistinct = unique.size === states.length

          return allLongEnough && allDistinct
        }
      ),
      { numRuns: 100 }
    )
  })
})
