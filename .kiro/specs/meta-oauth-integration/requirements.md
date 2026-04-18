# Requirements Document

## Introduction

This feature enables AutoflowPilot users to connect their Instagram, Facebook (Messenger), and WhatsApp Business accounts via Meta OAuth 2.0. Once connected, these integrations allow AutoflowPilot to send and receive messages on behalf of the user through the Meta Graph API. The OAuth flow is initiated from the Integrations page, handled by the Express.js backend, and connection state is persisted per user in MongoDB.

## Glossary

- **AutoflowPilot**: The SaaS platform at https://autoflow-ecru.vercel.app that provides messaging automation.
- **Meta_OAuth_Service**: The Meta (Facebook) OAuth 2.0 authorization server at https://www.facebook.com/v19.0/dialog/oauth.
- **Integration_API**: The AutoflowPilot Express.js backend deployed at https://autoflow-api.vercel.app, responsible for handling OAuth flows and storing tokens.
- **Integrations_Page**: The React frontend page at `src/pages/Integrations.jsx` where users manage platform connections.
- **User**: An authenticated AutoflowPilot account holder identified by a JWT stored in localStorage as `af_token`.
- **Meta_App**: The registered Meta application with App ID `992279893125717` that has three use cases: Instagram Messaging, Messenger, and WhatsApp Business.
- **Access_Token**: A long-lived Meta Graph API token issued after OAuth authorization, used to interact with Meta APIs on behalf of the user.
- **Integration_Record**: A MongoDB document associated with a User that stores the platform name, Access_Token, token expiry, connected page/account IDs, and connection status.
- **Callback_URL**: The backend endpoint `https://autoflow-api.vercel.app/api/integrations/meta/callback` that Meta redirects to after user authorization.
- **State_Parameter**: A cryptographically random, per-session value included in the OAuth request and verified on callback to prevent CSRF attacks.
- **Platform**: One of the three Meta messaging channels — Instagram, Facebook (Messenger), or WhatsApp Business.

---

## Requirements

### Requirement 1: Initiate Meta OAuth Flow

**User Story:** As a User, I want to click "Connect" on a Platform card in the Integrations page, so that I am redirected to Meta to authorize AutoflowPilot.

#### Acceptance Criteria

1. WHEN a User clicks "Connect" on an Instagram, Facebook, or WhatsApp card, THE Integrations_Page SHALL redirect the browser to the Meta_OAuth_Service authorization URL.
2. THE Integration_API SHALL construct the authorization URL with the `client_id` set to the Meta_App App ID, `redirect_uri` set to the Callback_URL, `scope` set to the permissions required for the selected Platform, and `response_type` set to `code`.
3. THE Integration_API SHALL include a `state` parameter in the authorization URL encoding both the State_Parameter and the selected Platform name.
4. THE Integration_API SHALL store the State_Parameter server-side associated with the authenticated User's session for later verification.
5. WHEN the User is not authenticated, THE Integration_API SHALL return a 401 response and THE Integrations_Page SHALL redirect the User to the login page.

---

### Requirement 2: Handle OAuth Callback

**User Story:** As a User, I want the backend to handle Meta's redirect after I authorize, so that my access token is securely exchanged and stored.

#### Acceptance Criteria

1. WHEN Meta redirects to the Callback_URL with a `code` and `state` query parameter, THE Integration_API SHALL verify the `state` parameter matches the stored State_Parameter for the associated session.
2. IF the `state` parameter does not match, THEN THE Integration_API SHALL return a 400 response with the message "Invalid state parameter" and SHALL NOT proceed with token exchange.
3. WHEN the `state` parameter is valid, THE Integration_API SHALL exchange the `code` for an Access_Token by calling the Meta Graph API token endpoint with the `client_id`, `client_secret`, `redirect_uri`, and `code`.
4. IF the Meta Graph API token endpoint returns an error, THEN THE Integration_API SHALL log the error and redirect the browser to the Integrations_Page with an `error` query parameter describing the failure.
5. WHEN the Access_Token is successfully obtained, THE Integration_API SHALL exchange it for a long-lived token using the Meta Graph API.
6. WHEN a long-lived Access_Token is obtained, THE Integration_API SHALL store the Integration_Record in MongoDB containing the User ID, Platform name, Access_Token, token expiry timestamp, and connection status set to `connected`.
7. WHEN the Integration_Record is saved, THE Integration_API SHALL redirect the browser to the Integrations_Page with a `success` query parameter indicating the connected Platform.

---

### Requirement 3: Display Connection Status

**User Story:** As a User, I want the Integrations page to show whether each Meta Platform is connected or disconnected, so that I can see the current state of my integrations at a glance.

#### Acceptance Criteria

1. WHEN the Integrations_Page loads, THE Integrations_Page SHALL fetch the connection status of all Platforms for the authenticated User from the Integration_API.
2. THE Integration_API SHALL expose a `GET /api/integrations/meta/status` endpoint that returns the connection status and connected account display name for each Platform associated with the authenticated User.
3. WHEN a Platform has a stored Integration_Record with status `connected`, THE Integrations_Page SHALL display a "Connected" badge and a "Disconnect" button for that Platform card.
4. WHEN a Platform has no Integration_Record or has status `disconnected`, THE Integrations_Page SHALL display a "Not Connected" badge and a "Connect" button for that Platform card.
5. WHEN the Integrations_Page receives a `success` query parameter on load, THE Integrations_Page SHALL display a success notification identifying the newly connected Platform.
6. WHEN the Integrations_Page receives an `error` query parameter on load, THE Integrations_Page SHALL display an error notification with the failure reason.

---

### Requirement 4: Disconnect a Platform

**User Story:** As a User, I want to disconnect a connected Meta Platform, so that AutoflowPilot no longer has access to that account.

#### Acceptance Criteria

1. WHEN a User clicks "Disconnect" on a connected Platform card, THE Integrations_Page SHALL display a confirmation modal before proceeding.
2. WHEN the User confirms disconnection, THE Integrations_Page SHALL call `DELETE /api/integrations/meta/:platform` on the Integration_API.
3. WHEN the Integration_API receives a valid disconnect request, THE Integration_API SHALL update the Integration_Record status to `disconnected` and remove the stored Access_Token from the record.
4. WHEN the disconnect operation succeeds, THE Integrations_Page SHALL update the Platform card to show "Not Connected" status without requiring a full page reload.
5. IF the Integration_API returns an error during disconnection, THEN THE Integrations_Page SHALL display an error notification and SHALL NOT change the displayed connection status.

---

### Requirement 5: Persist Integration Records per User

**User Story:** As a User, I want my connected Meta accounts to remain connected across sessions, so that I do not need to re-authorize every time I log in.

#### Acceptance Criteria

1. THE Integration_API SHALL store each Integration_Record in MongoDB scoped to the User's ID so that no User can access another User's Integration_Record.
2. WHEN a User connects a Platform that already has an Integration_Record, THE Integration_API SHALL update the existing record rather than creating a duplicate.
3. THE Integration_API SHALL store the Access_Token in the Integration_Record in encrypted form using AES-256 encryption before writing to MongoDB.
4. WHEN the Integration_API reads an Access_Token from MongoDB, THE Integration_API SHALL decrypt the token before using it in any Meta Graph API call.
5. WHEN a User's account is deleted, THE Integration_API SHALL delete all Integration_Records associated with that User.

---

### Requirement 6: Scope and Permission Management

**User Story:** As a User, I want AutoflowPilot to request only the permissions needed for each Platform, so that I can trust the app with minimal access.

#### Acceptance Criteria

1. WHEN initiating OAuth for Instagram, THE Integration_API SHALL request the scopes `instagram_basic`, `instagram_manage_messages`, and `pages_show_list`.
2. WHEN initiating OAuth for Facebook (Messenger), THE Integration_API SHALL request the scopes `pages_messaging`, `pages_show_list`, and `pages_manage_metadata`.
3. WHEN initiating OAuth for WhatsApp Business, THE Integration_API SHALL request the scopes `whatsapp_business_management` and `whatsapp_business_messaging`.
4. IF the User denies one or more required permissions during Meta authorization, THEN THE Integration_API SHALL redirect to the Integrations_Page with an `error` query parameter stating that required permissions were not granted.

---

### Requirement 7: Security and Token Handling

**User Story:** As a User, I want my Meta access tokens to be handled securely, so that my accounts cannot be compromised.

#### Acceptance Criteria

1. THE Integration_API SHALL never expose the Access_Token in any HTTP response sent to the frontend.
2. THE Integration_API SHALL never expose the Meta_App `client_secret` in any response or client-side code.
3. WHEN the Integration_API constructs the OAuth authorization URL, THE Integration_API SHALL generate a new State_Parameter of at least 32 cryptographically random bytes for each authorization request.
4. THE Integration_API SHALL invalidate the stored State_Parameter immediately after it is verified on callback, whether verification succeeds or fails.
5. WHEN an Access_Token stored in an Integration_Record is within 7 days of its expiry timestamp, THE Integration_API SHALL attempt to refresh the token using the Meta Graph API token refresh endpoint.
6. IF the token refresh fails, THEN THE Integration_API SHALL update the Integration_Record status to `expired` and THE Integrations_Page SHALL display the Platform card with a "Reconnect" prompt.
