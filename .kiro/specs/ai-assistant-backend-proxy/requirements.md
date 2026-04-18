# Requirements Document

## Introduction

This feature moves the Gemini AI API calls from the React frontend (`AIAssistant.jsx`) to a secure Express backend proxy endpoint (`/api/ai/chat`). The `GEMINI_API_KEY` is removed from the client bundle entirely and stored only in the server environment. The frontend authenticates with a JWT and calls the backend proxy, which forwards the request to Gemini and returns the reply. This eliminates the 400 Bad Request error caused by the exposed `VITE_GEMINI_API_KEY` and follows the same pattern already used by `/api/auth` and `/api/email`.

## Glossary

- **Proxy_Route**: The Express route handler at `backend/routes/ai.js` that receives chat requests and forwards them to the Gemini API.
- **AIAssistant**: The React component at `src/components/AIAssistant.jsx` that renders the chat widget.
- **API_Client**: The `api` object in `src/lib/api.js` used by the frontend to communicate with the backend.
- **Auth_Middleware**: The JWT validation middleware at `backend/middleware/auth.js`.
- **Gemini_API**: The external Google Generative Language API (`generativelanguage.googleapis.com`).
- **ChatMessage**: An object with shape `{ role: "user" | "model", parts: [{ text: string }] }` as expected by the Gemini API.
- **GEMINI_API_KEY**: The secret API key for the Gemini API, stored only in the server-side environment variable `process.env.GEMINI_API_KEY`.
- **JWT**: A JSON Web Token stored in `localStorage` under the key `af_token`, used to authenticate requests to the backend.

## Requirements

### Requirement 1: Backend AI Proxy Route

**User Story:** As a backend developer, I want a dedicated Express route that proxies AI chat requests to Gemini, so that the API key is never exposed to the client.

#### Acceptance Criteria

1. THE Proxy_Route SHALL accept `POST` requests at `/api/ai/chat` with a JSON body containing a `messages` array of `ChatMessage` objects.
2. WHEN a valid request is received, THE Proxy_Route SHALL forward the `messages` array and a server-side system prompt to the Gemini_API using `process.env.GEMINI_API_KEY`.
3. WHEN the Gemini_API returns a successful response, THE Proxy_Route SHALL respond with HTTP 200 and a JSON body `{ reply: string }` where `reply` is the non-empty text from `candidates[0].content.parts[0].text`.
4. IF the `messages` field is missing or is an empty array, THEN THE Proxy_Route SHALL respond with HTTP 400 and `{ message: "messages array is required" }`.
5. IF the Gemini_API returns an error, a network failure occurs, or the response is malformed, THEN THE Proxy_Route SHALL respond with HTTP 502 and `{ message: "AI service unavailable" }`.
6. THE Proxy_Route SHALL never include the value of `GEMINI_API_KEY` in any HTTP response body or header.

### Requirement 2: Authentication Enforcement

**User Story:** As a system operator, I want the AI proxy endpoint to require a valid JWT, so that only authenticated users can consume the Gemini API quota.

#### Acceptance Criteria

1. THE Proxy_Route SHALL apply Auth_Middleware to all requests before the handler executes.
2. IF a request arrives without an `Authorization` header, THEN THE Auth_Middleware SHALL respond with HTTP 401 and `{ message: "No token provided" }` before the Proxy_Route handler runs.
3. IF a request arrives with an invalid or expired JWT, THEN THE Auth_Middleware SHALL respond with HTTP 401 and `{ message: "Invalid token" }` before the Proxy_Route handler runs.
4. WHEN a request passes JWT validation, THE Auth_Middleware SHALL set `req.userId` and call `next()` to allow the Proxy_Route handler to execute.

### Requirement 3: Backend Server Registration

**User Story:** As a backend developer, I want the AI route registered in the Express server, so that the `/api/ai/chat` endpoint is reachable.

#### Acceptance Criteria

1. THE backend server (`backend/server.js`) SHALL import `backend/routes/ai.js` and mount it at the `/api/ai` path.
2. WHEN the server starts, THE backend server SHALL expose the `POST /api/ai/chat` endpoint alongside the existing `/api/auth` and `/api/email` routes.

### Requirement 4: Frontend API Client Extension

**User Story:** As a frontend developer, I want the `api` client to include a `chatAI` method, so that `AIAssistant.jsx` can call the backend proxy through the existing HTTP abstraction.

#### Acceptance Criteria

1. THE API_Client SHALL expose a `chatAI(messages)` method that sends a `POST` request to `/ai/chat` with `{ messages }` as the JSON body.
2. WHEN the backend responds with a non-2xx status, THE API_Client SHALL throw an `Error` with the response message so the caller can handle it.
3. THE API_Client `chatAI` method SHALL include the JWT `Authorization: Bearer <token>` header using the same mechanism as all other `api` methods.

### Requirement 5: Frontend AIAssistant Refactor

**User Story:** As a security engineer, I want the `AIAssistant.jsx` component to call the backend proxy instead of the Gemini API directly, so that the API key is removed from the client bundle.

#### Acceptance Criteria

1. THE AIAssistant SHALL remove all references to `VITE_GEMINI_API_KEY` and the direct `fetch` call to `generativelanguage.googleapis.com`.
2. WHEN a user sends a message, THE AIAssistant SHALL call `api.chatAI(contents)` and read the `reply` field from the response.
3. THE AIAssistant SHALL map its internal message format (`{ from: "user"|"ai", text }`) to the `ChatMessage` format (`{ role: "user"|"model", parts: [{ text }] }`) before calling `api.chatAI`.
4. WHEN `api.chatAI` throws an error, THE AIAssistant SHALL display the existing fallback error message to the user without crashing.
5. THE AIAssistant SHALL preserve all existing UI and UX behaviour (chat window, typing indicator, quick questions, scroll-to-bottom) unchanged.

### Requirement 6: Environment Variable Security

**User Story:** As a security engineer, I want the Gemini API key stored only in the server environment, so that it cannot be extracted from the browser.

#### Acceptance Criteria

1. THE backend SHALL read the Gemini API key exclusively from `process.env.GEMINI_API_KEY` at runtime.
2. THE frontend build SHALL contain zero references to `VITE_GEMINI_API_KEY` after the refactor.
3. WHERE a `GEMINI_API_KEY` environment variable is not set on the server, THE Proxy_Route SHALL respond with HTTP 502 rather than exposing a configuration error to the client.
