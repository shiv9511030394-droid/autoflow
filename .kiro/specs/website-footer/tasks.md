# Implementation Plan: Website Footer

## Overview

Replace the minimal `Footer.jsx` with a full marketing footer, add Privacy Policy and Terms of Service pages, register the new routes in `App.jsx`, install `fast-check` for property-based testing, and write unit + property tests. All implementation uses React + Vite, Tailwind CSS, and React Router v6.

## Tasks

- [x] 1. Install fast-check and set up the test environment
  - Run `npm install --save-dev fast-check vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom` to add the PBT library and test runner
  - Add a `test` script to `package.json`: `"test": "vitest --run"` and a `"test:watch"` script: `"vitest"`
  - Add a `vite.config.js` test block: `test: { environment: 'jsdom', globals: true, setupFiles: ['./src/tests/setup.js'] }`
  - Create `src/tests/setup.js` that imports `@testing-library/jest-dom`
  - _Requirements: 4.5, 4.7 (property tests require fast-check; unit tests require vitest + testing-library)_

- [x] 2. Replace `src/components/Footer.jsx` with the full marketing footer
  - [x] 2.1 Define static data arrays and inline SVG social icons
    - Define `SOCIAL_LINKS` array with five entries (Instagram, Facebook, Twitter/X, LinkedIn, YouTube), each with `label`, `href`, and an inline SVG `Icon` component
    - Define `NAV_COLUMNS` array with three column objects (Product, Company, Legal), each containing a `heading` and `links` array where each link has `label`, `href`, and `external` boolean
    - _Requirements: 2.3, 2.4, 3.1, 3.2, 3.3, 3.4_

  - [x] 2.2 Implement the Branding Section
    - Render `<Logo size="sm" />` imported from `@/components/Logo`
    - Render tagline `"Automate your growth."` with `text-gray-400 text-sm` styling
    - Render social icons in a horizontal `flex` row; each icon is an `<a>` tag with `href`, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label="Follow us on {label}"` attributes
    - Apply `text-gray-400 hover:text-white transition-colors duration-200` to each social icon link
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.3_

  - [x] 2.3 Implement the Navigation Columns
    - Wrap all three columns in a `<nav aria-label="Footer navigation">` element
    - For each column in `NAV_COLUMNS`, render a heading with `font-semibold text-white text-sm uppercase tracking-wider` and a `<ul>` of links
    - Use `<Link to={href}>` for internal routes (`external: false`) and `<a href={href} target="_blank" rel="noopener noreferrer">` for external URLs (`external: true`)
    - Apply `text-gray-400 hover:text-white transition-colors duration-200` to all nav links
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 8.2_

  - [x] 2.4 Implement the Newsletter Form
    - Render a `<form>` with heading `"Stay in the loop"`
    - Add a controlled `<input type="email" required>` with `placeholder="Enter your email"`, `aria-label="Email address for newsletter"`, and glass styling (`bg-white/5 border border-white/10 backdrop-blur-xl text-white placeholder-gray-500 rounded-lg`)
    - Add a `"Subscribe"` submit button
    - Manage `email` string state and `status: 'idle' | 'success' | 'error'` state with `useState`
    - On submit: use optimistic success pattern — clear input and set `status = 'success'`; wrap in try/catch to set `status = 'error'` on network failure
    - Use `useEffect` with a `setTimeout` of 3000ms to reset `status` back to `'idle'` when `status === 'success'`; return cleanup function to clear the timeout
    - Conditionally render `"Thanks for subscribing!"` when `status === 'success'` and `"Something went wrong. Please try again."` when `status === 'error'`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 7.5, 8.4_

  - [x] 2.5 Implement the Bottom Bar
    - Compute `const year = new Date().getFullYear()`
    - Render copyright text `"© {year} Aotuflow. All rights reserved."` with `text-gray-500 text-xs`
    - Render `<Link to="/privacy">Privacy Policy</Link>` and `<Link to="/terms">Terms of Service</Link>` links
    - Separate the bottom bar from the rest of the footer with `border-t border-white/10`
    - Use `flex flex-col md:flex-row md:justify-between` for responsive layout (stacked on mobile, horizontal on desktop)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 2.6 Wire all sections into the Footer root element
    - Use `<footer>` as the root semantic element with `border-t border-white/10 bg-[#060d1a]` classes
    - Apply responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8` for the main content area; branding spans 2 cols on lg
    - Compose BrandingSection, NavColumns, NewsletterForm, and BottomBar in the correct order
    - Ensure the component exports as default so no import changes are needed in `LandingPage.jsx`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 7.1, 7.2, 7.3, 7.6, 8.1_

  - [ ]* 2.7 Write property test — Property 1: Social icons open in new tab with safe attributes
    - **Property 1: Social icons open in new tab with safe attributes**
    - For each of the 5 rendered social icon `<a>` elements, assert that `href` is non-empty, `target` equals `"_blank"`, and `rel` equals `"noopener noreferrer"`
    - Tag: `// Feature: website-footer, Property 1: Social icons open in new tab with safe attributes`
    - **Validates: Requirements 2.4**

  - [ ]* 2.8 Write property test — Property 2: All social icons have descriptive aria-labels
    - **Property 2: All social icons have descriptive aria-labels**
    - For each of the 5 rendered social icon `<a>` elements, assert that `aria-label` is a non-empty string containing the platform name
    - Tag: `// Feature: website-footer, Property 2: All social icons have descriptive aria-labels`
    - **Validates: Requirements 8.3**

  - [ ]* 2.9 Write property test — Property 3: Internal links use Link, external links use anchor tags
    - **Property 3: Internal links use React Router Link, external links use anchor tags**
    - For each nav link in `NAV_COLUMNS`, assert that links with `external: false` render as `<a>` elements without `target="_blank"` (React Router renders as `<a>` in DOM) and links with `external: true` render with `target="_blank"` and `rel="noopener noreferrer"`
    - Use `fc.constantFrom(...NAV_COLUMNS.flatMap(c => c.links))` to drive the property
    - Tag: `// Feature: website-footer, Property 3: Internal links use React Router Link, external links use anchor tags`
    - **Validates: Requirements 3.6**

- [x] 3. Checkpoint — Ensure Footer renders correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create `src/pages/PrivacyPolicy.jsx`
  - [x] 4.1 Implement the Privacy Policy page component
    - Create a standalone page with a full-width dark-themed layout (`min-h-screen bg-[#060d1a] text-white`)
    - Render a page header with heading `"Privacy Policy"` (using `gradient-text` class) and a last-updated date
    - Render five content sections: Data Collection, Data Usage, Cookies, Third-Party Services, User Rights — each with a heading and placeholder body text
    - Import and render `<Footer />` at the bottom of the page
    - _Requirements: 6.1, 6.3, 6.5, 6.7_

  - [ ]* 4.2 Write unit tests for PrivacyPolicy page
    - Assert heading `"Privacy Policy"` is present
    - Assert all five required section headings are rendered
    - Assert `<Footer />` is rendered at the bottom
    - _Requirements: 6.3, 6.5_

- [x] 5. Create `src/pages/Terms.jsx`
  - [x] 5.1 Implement the Terms of Service page component
    - Create a standalone page with the same dark-themed layout as PrivacyPolicy
    - Render a page header with heading `"Terms of Service"` and a last-updated date
    - Render five content sections: Acceptance of Terms, Use of Service, Prohibited Activities, Intellectual Property, Limitation of Liability — each with a heading and placeholder body text
    - Import and render `<Footer />` at the bottom of the page
    - _Requirements: 6.2, 6.4, 6.6, 6.7_

  - [ ]* 5.2 Write unit tests for Terms page
    - Assert heading `"Terms of Service"` is present
    - Assert all five required section headings are rendered
    - Assert `<Footer />` is rendered at the bottom
    - _Requirements: 6.4, 6.6_

- [x] 6. Register `/privacy` and `/terms` routes in `src/App.jsx`
  - Add lazy imports: `const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))` and `const Terms = lazy(() => import('./pages/Terms'))`
  - Add `<Route path="/privacy" element={<PrivacyPolicy />} />` and `<Route path="/terms" element={<Terms />} />` inside `<Routes>`, before the `*` catch-all route
  - Both routes are public (no auth guard)
  - _Requirements: 6.1, 6.2_

- [x] 7. Write unit and property tests for the Footer component in `src/tests/footer.test.jsx`
  - [x] 7.1 Write unit tests covering rendering and structure
    - Footer renders `<footer>` as root element (Req 8.1)
    - Footer contains `<nav aria-label="Footer navigation">` (Req 8.2)
    - Branding section renders Logo with `size="sm"` (Req 2.1)
    - Tagline `"Automate your growth."` is present (Req 2.2)
    - All five social icon links are rendered (Req 2.3)
    - All three nav column headings are present: Product, Company, Legal (Req 3.1)
    - Product column contains all four expected links (Req 3.2)
    - Company column contains all four expected links (Req 3.3)
    - Legal column contains Privacy Policy (`/privacy`) and Terms of Service (`/terms`) links (Req 3.4)
    - Newsletter heading `"Stay in the loop"` is present (Req 4.1)
    - Email input has `placeholder="Enter your email"`, `type="email"`, and `required` attribute (Req 4.2, 4.4)
    - Subscribe button is present (Req 4.3)
    - Email input has `aria-label="Email address for newsletter"` (Req 8.4)
    - Bottom bar shows current year in copyright text (Req 5.1)
    - Bottom bar has Privacy Policy and Terms of Service links (Req 5.2)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 8.1, 8.2, 8.4_

  - [ ]* 7.2 Write unit tests for newsletter form behavior
    - Success message `"Thanks for subscribing!"` appears after valid email submission (Req 4.5)
    - Success message disappears after 3000ms — use `vi.useFakeTimers()` (Req 4.6)
    - Error message `"Something went wrong. Please try again."` shown when fetch throws (Req 4.7)
    - _Requirements: 4.5, 4.6, 4.7_

  - [ ]* 7.3 Write property test — Property 4: Valid email submission clears input and shows success
    - **Property 4: Valid email submission clears input and shows success**
    - Use `fc.emailAddress()` to generate valid email strings; for each, simulate form submission and assert the input is cleared and `"Thanks for subscribing!"` is displayed
    - Tag: `// Feature: website-footer, Property 4: Valid email submission clears input and shows success`
    - **Validates: Requirements 4.5**

  - [ ]* 7.4 Write property test — Property 5: All interactive footer elements are keyboard-accessible
    - **Property 5: All interactive footer elements are keyboard-accessible**
    - Query all `<a>`, `<button>`, and `<input>` elements inside the rendered footer; for each, assert it is a naturally focusable element type (tagName in `['A', 'BUTTON', 'INPUT']`) or has a non-negative `tabIndex`
    - Tag: `// Feature: website-footer, Property 5: All interactive footer elements are keyboard-accessible`
    - **Validates: Requirements 8.5**

- [x] 8. Final checkpoint — Ensure all tests pass
  - Run `npm test` and confirm all unit and property tests pass
  - Verify the footer renders correctly on the LandingPage, PrivacyPolicy, and Terms pages
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Properties 1–3 are tested close to the Footer implementation (task 2) to catch errors early
- Properties 4–5 are tested in the dedicated test file (task 7) alongside unit tests
- The newsletter form uses an optimistic success pattern — no backend endpoint is required
- `fast-check` must be installed before any property tests are written (task 1)
