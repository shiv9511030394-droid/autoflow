# Tasks

## Task List

- [x] 1. Create backend AI proxy route
  - [x] 1.1 Create `backend/routes/ai.js` with the POST `/chat` handler that validates the `messages` body, calls the Gemini API using `process.env.GEMINI_API_KEY`, and returns `{ reply }` or structured error responses (400, 502)
  - [x] 1.2 Apply `authMiddleware` to the route so all requests require a valid JWT before the handler runs
  - [x] 1.3 Add `GEMINI_API_KEY` to `backend/.env` and `backend/.env.example`

- [x] 2. Register the AI route in the Express server
  - [x] 2.1 Import `backend/routes/ai.js` in `backend/server.js` and mount it at `/api/ai`

- [x] 3. Extend the frontend API client
  - [x] 3.1 Add `chatAI(messages)` method to the `api` object in `src/lib/api.js` that POSTs to `/ai/chat` with `{ messages }`

- [x] 4. Refactor AIAssistant.jsx to use the backend proxy
  - [x] 4.1 Remove `GEMINI_API_KEY` constant and the direct `callGemini` fetch function from `AIAssistant.jsx`
  - [x] 4.2 Add a `callAI(messages)` function that maps internal message format to `ChatMessage` format and calls `api.chatAI`
  - [x] 4.3 Update `sendMessage` to call `callAI` instead of `callGemini`, keeping all existing UI logic unchanged

- [x] 5. Clean up environment variables
  - [x] 5.1 Remove `VITE_GEMINI_API_KEY` from the frontend `.env` file (root `.env`)
  - [x] 5.2 Verify the production Vite build (`dist/`) contains no reference to the Gemini API key or URL
