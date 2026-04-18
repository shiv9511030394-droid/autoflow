# Implementation Plan: Meta OAuth Integration

## Overview

Implement Meta (Facebook/Instagram/WhatsApp) OAuth 2.0 integration end-to-end: AES-256-GCM token encryption, MongoDB models with TTL, four Express.js route handlers, frontend API methods, and an updated Integrations page that reflects real connection state.

## Tasks

- [x] 1. Set up encryption utility and environment variables
  - Create `backend/lib/encryption.js` using Node's built-in `crypto` module with AES-256-GCM
  - Export `encrypt(plaintext)` → `{ ciphertext, iv, authTag }` and `decrypt(ciphertext, iv, authTag)` → `plaintext`
  - Key is read from `process.env.ENCRYPTION_KEY` (32-byte hex); throw a clear startup error if missing
  - Add to `backend/.env`:
    ```
    ENCRYPTION_KEY=e51b000413303a38d37876a0b13bf49c390ae36b5c2e3c6ca0a703aebf2338a9
    META_APP_ID=992279893125717
    META_APP_SECRET=5713ef6d4561bf9ff9af8ddf04ea266e
    ```
  - Add the same three keys (with placeholder values) to `backend/.env.example`
  - [x] 1.1 Write property test for token encryption round-trip (Property 6)
    - **Property 6: Token encryption round-trip** — `decrypt(encrypt(token))` equals original token for any non-empty string; `encrypt(token)` does not equal the original token
    - Use `fc.string({ minLength: 1 })` from fast-check, minimum 100 iterations
    - **Validates: Requirements 5.3, 5.4**
  - _Requirements: 5.3, 5.4, 7.2_

- [x] 2. Create MongoDB models
  - [x] 2.1 Create `backend/models/OAuthState.js`
    - Schema: `userId` (ObjectId ref User), `state` (String, unique, indexed), `platform` (enum: instagram|facebook|whatsapp), `expiresAt` (Date, default now+10min)
    - Add TTL index: `oauthStateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })`
    - _Requirements: 1.4, 7.3, 7.4_
  - [x] 2.2 Write property test for OAuthState storage and retrieval (Property 3)
    - **Property 3: State storage and retrieval** — storing an OAuthState and querying by state value returns the same userId and platform
    - Use `fc.uuid()` and `fc.hexaString({ minLength: 64, maxLength: 64 })`, minimum 100 iterations
    - **Validates: Requirements 1.4**
  - [x] 2.3 Write property test for state uniqueness (Property 5)
    - **Property 5: State uniqueness** — N independently generated state values are all distinct and each ≥ 64 hex chars
    - Use `fc.integer({ min: 2, max: 20 })` for N, minimum 100 iterations
    - **Validates: Requirements 7.3**
  - [x] 2.4 Create `backend/models/Integration.js`
    - Schema: `userId` (ObjectId ref User, indexed), `platform` (enum), `encryptedToken`, `iv`, `authTag`, `expiresAt`, `status` (enum: connected|disconnected|expired, default disconnected), `connectedAt`
    - Add compound unique index: `{ userId: 1, platform: 1 }`
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 2.5 Write property test for integration upsert — no duplicates (Property 7)
    - **Property 7: Integration record upsert** — calling connect N times for the same (userId, platform) results in exactly one Integration document
    - Use `fc.uuid()`, `fc.constantFrom('instagram','facebook','whatsapp')`, `fc.integer({ min: 1, max: 5 })` for N, minimum 100 iterations
    - **Validates: Requirements 5.2**
  - [x] 2.6 Write property test for user isolation (Property 8)
    - **Property 8: User isolation** — querying integrations for userId A never returns documents whose userId equals B
    - Use two distinct `fc.uuid()` values, minimum 100 iterations
    - **Validates: Requirements 5.1**

- [x] 3. Checkpoint — Ensure models and encryption compile without errors
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement integrations route handlers
  - Create `backend/routes/integrations.js` with all four endpoints using the `authMiddleware` from `backend/middleware/auth.js`
  - [x] 4.1 Implement `GET /api/integrations/meta/connect`
    - Require auth; read `platform` query param; validate against allowed enum
    - Generate 32-byte cryptographically random state with `crypto.randomBytes(32).toString('hex')`
    - Save `OAuthState` document `{ userId, state, platform }`
    - Construct Meta OAuth URL: `https://www.facebook.com/v19.0/dialog/oauth` with `client_id`, `redirect_uri` (`https://autoflow-api.vercel.app/api/integrations/meta/callback`), `scope` (from `PLATFORM_SCOPES` map), `response_type=code`, `state=<state>:<platform>`
    - Redirect browser to constructed URL
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.1, 6.2, 6.3_
  - [x] 4.2 Write property test for OAuth URL construction (Property 1)
    - **Property 1: OAuth URL contains required parameters for any platform** — for any valid platform, the URL contains `client_id`, `redirect_uri`, `response_type=code`, `state`, and the correct scope string
    - Use `fc.constantFrom('instagram','facebook','whatsapp')`, minimum 100 iterations
    - **Validates: Requirements 1.2, 1.3, 6.1, 6.2, 6.3**
  - [x] 4.3 Write property test for state parameter round-trip (Property 2)
    - **Property 2: State parameter round-trip** — encoding state+platform into the state param and decoding it recovers both values exactly
    - Use `fc.string()` and `fc.constantFrom('instagram','facebook','whatsapp')`, minimum 100 iterations
    - **Validates: Requirements 1.3**
  - [x] 4.4 Implement `GET /api/integrations/meta/callback`
    - No auth middleware (Meta redirects here directly)
    - Read `code`, `state`, and optional `error` query params
    - If `error` present (e.g. `access_denied`), redirect to `https://autoflow-ecru.vercel.app/integrations?error=<reason>`
    - Parse `state` as `<stateValue>:<platform>`; look up and delete `OAuthState` by `state` value; if not found redirect with `error=invalid_state`
    - Exchange `code` for short-lived token via `https://graph.facebook.com/v19.0/oauth/access_token`
    - Exchange short-lived token for long-lived token via `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token`
    - Encrypt long-lived token with `encryption.encrypt()`; upsert `Integration` record with `{ encryptedToken, iv, authTag, expiresAt, status: 'connected', connectedAt: new Date() }`
    - Redirect to `https://autoflow-ecru.vercel.app/integrations?success=<platform>`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 5.2, 5.3, 7.4_
  - [x] 4.5 Write property test for state invalidation after use (Property 4)
    - **Property 4: State invalidation after use** — verifying a state parameter a second time fails with not-found
    - Use `fc.hexaString({ minLength: 64 })`, minimum 100 iterations
    - **Validates: Requirements 7.4**
  - [x] 4.6 Implement `GET /api/integrations/meta/status`
    - Require auth; query all `Integration` documents for `userId`
    - Build response object with entries for all three platforms (default to `{ status: 'disconnected', connectedAt: null }` for missing records)
    - Never include `encryptedToken`, `iv`, or `authTag` in the response
    - _Requirements: 3.1, 3.2, 7.1_
  - [x] 4.7 Write property test for status always returns all platforms (Property 10)
    - **Property 10: Status endpoint always returns all platforms** — response always contains entries for instagram, facebook, and whatsapp regardless of which are connected
    - Use `fc.uuid()` and `fc.subarray(['instagram','facebook','whatsapp'])` for connected subset, minimum 100 iterations
    - **Validates: Requirements 3.2**
  - [x] 4.8 Write property test for access token never in API responses (Property 11)
    - **Property 11: Access token never appears in API responses** — JSON body of any `/api/integrations/*` response does not contain the decrypted token value
    - Use `fc.string({ minLength: 20 })` for token value, minimum 100 iterations
    - **Validates: Requirements 7.1**
  - [x] 4.9 Implement `DELETE /api/integrations/meta/:platform`
    - Require auth; validate `:platform` against allowed enum
    - Find Integration record for `{ userId, platform }`; if not found return 404
    - Update record: `{ status: 'disconnected', encryptedToken: null, iv: null, authTag: null }`
    - Return 200 `{ message: 'Disconnected' }`
    - _Requirements: 4.2, 4.3_
  - [x] 4.10 Write property test for disconnect clears token and sets status (Property 9)
    - **Property 9: Disconnect clears token and sets status** — after disconnect, record has `status: disconnected` and `encryptedToken` is null
    - Use `fc.uuid()` and `fc.constantFrom('instagram','facebook','whatsapp')`, minimum 100 iterations
    - **Validates: Requirements 4.3**

- [x] 5. Register integrations route in server.js
  - Add `const integrationsRoutes = require('./routes/integrations')` to `backend/server.js`
  - Add `app.use('/api/integrations', integrationsRoutes)` after the existing route registrations
  - _Requirements: 1.1, 2.1, 3.1, 4.2_

- [x] 6. Checkpoint — Ensure all backend routes are reachable and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Add integrations API methods to frontend
  - Add an `integrations` namespace to the `api` object in `src/lib/api.js`:
    - `getStatus()` → `GET /integrations/meta/status` (authenticated)
    - `getConnectUrl(platform)` → `GET /integrations/meta/connect?platform=<platform>` (returns the redirect URL or follows redirect)
    - `disconnect(platform)` → `DELETE /integrations/meta/<platform>` (authenticated)
  - Note: `getConnectUrl` should return the full redirect URL so the caller can set `window.location.href`; use `fetch` with `redirect: 'manual'` or simply construct the URL client-side from the base URL
  - _Requirements: 1.1, 3.1, 4.2_

- [x] 8. Update Integrations.jsx to use real API
  - Replace the static `initialApps` array for Instagram, Facebook, and WhatsApp with dynamic state fetched from `api.integrations.getStatus()` on mount
  - Show a loading skeleton (or spinner) while the status fetch is in progress
  - On "Connect" click for a Meta platform: call `api.integrations.getConnectUrl(platform)` then set `window.location.href` to the returned URL
  - On confirmed "Disconnect": call `api.integrations.disconnect(platform)`; on success update local state to `disconnected`; on error show an error notification and leave state unchanged
  - On mount, read `?success=<platform>` query param and show a success toast (e.g. "Instagram connected successfully")
  - On mount, read `?error=<reason>` query param and show an error toast with the reason
  - Keep non-Meta integrations (YouTube, SMTP, Webhooks, Telegram) as static entries
  - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.4, 4.5_
  - [x] 8.1 Write property test for UI renders correct controls for any platform status (Property 12)
    - **Property 12: UI renders correct controls for any platform status** — "Connected" badge + "Disconnect" button when status is `connected`; "Not Connected" badge + "Connect" button when status is `disconnected` or absent
    - Use `fc.constantFrom('connected','disconnected',null)`, minimum 100 iterations
    - **Validates: Requirements 3.3, 3.4**

- [x] 9. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests use **fast-check** with minimum 100 iterations per property; each test file should include the tag comment `// Feature: meta-oauth-integration, Property N: <property_text>`

### Manual Steps (not automatable by a coding agent)

> **Vercel Environment Variables** — After deploying the backend, add the following environment variables in the Vercel dashboard under the `autoflow-api` project settings:
> - `META_APP_ID` = `992279893125717`
> - `META_APP_SECRET` = `5713ef6d4561bf9ff9af8ddf04ea266e`
> - `ENCRYPTION_KEY` = `e51b000413303a38d37876a0b13bf49c390ae36b5c2e3c6ca0a703aebf2338a9`

> **Meta Developer Console** — In the Meta App dashboard (App ID `992279893125717`), add the following URI to the list of valid OAuth redirect URIs for each product (Instagram, Messenger, WhatsApp):
> - `https://autoflow-api.vercel.app/api/integrations/meta/callback`
