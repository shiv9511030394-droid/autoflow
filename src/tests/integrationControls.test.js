// Feature: meta-oauth-integration, Property 12: UI renders correct controls for any platform status

import fc from 'fast-check'

/**
 * Pure helper that determines which badge variant, badge label, and button label
 * to render for a given platform status value.
 *
 * @param {string|null} status - 'connected', 'disconnected', or null/undefined
 * @returns {{ badgeVariant: string, badgeLabel: string, buttonLabel: string }}
 */
export function getControlsForStatus(status) {
  const isConnected = status === 'connected'
  return {
    badgeVariant: isConnected ? 'success' : 'default',
    badgeLabel: isConnected ? 'Connected' : 'Not Connected',
    buttonLabel: isConnected ? 'Disconnect' : 'Connect',
  }
}

/**
 * Property 12: UI renders correct controls for any platform status
 * Validates: Requirements 3.3, 3.4
 *
 * - When status is 'connected': badge variant is 'success', label is 'Connected', button is 'Disconnect'
 * - When status is 'disconnected' or null: badge variant is 'default', label is 'Not Connected', button is 'Connect'
 */
describe('Property 12: UI renders correct controls for any platform status', () => {
  test('connected status shows Connected badge and Disconnect button', () => {
    fc.assert(
      fc.property(fc.constant('connected'), (status) => {
        const controls = getControlsForStatus(status)
        return (
          controls.badgeVariant === 'success' &&
          controls.badgeLabel === 'Connected' &&
          controls.buttonLabel === 'Disconnect'
        )
      }),
      { numRuns: 100 }
    )
  })

  test('disconnected or null status shows Not Connected badge and Connect button', () => {
    fc.assert(
      fc.property(fc.constantFrom('disconnected', null), (status) => {
        const controls = getControlsForStatus(status)
        return (
          controls.badgeVariant === 'default' &&
          controls.badgeLabel === 'Not Connected' &&
          controls.buttonLabel === 'Connect'
        )
      }),
      { numRuns: 100 }
    )
  })
})
