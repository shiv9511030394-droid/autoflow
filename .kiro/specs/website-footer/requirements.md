# Requirements Document

## Introduction

Aotuflow is a SaaS marketing automation platform. The existing `Footer.jsx` contains only a logo, a contact link, and a copyright line — it is very minimal. The goal of this feature is to build a **Full Marketing Footer** similar to those used by major SaaS products (e.g., Notion, Linear, Meta Developers).

The new footer will replace `src/components/Footer.jsx` and render on the LandingPage. The footer design must match Aotuflow's existing dark theme (`#060d1a` background, glass morphism, blue/purple gradients).

The footer will contain these sections:
- **Branding Section** — Logo, tagline, social media icons
- **Navigation Columns** — Product, Company, Legal links
- **Newsletter Signup** — Email input + subscribe button
- **Bottom Bar** — Copyright line and legal links

---

## Glossary

- **Footer**: The React component defined in `src/components/Footer.jsx` that renders at the bottom of the LandingPage
- **Branding_Section**: The part of the Footer containing the Aotuflow logo, tagline, and social media icons
- **Nav_Column**: A grouped link list in the Footer (e.g., "Product", "Company", "Legal")
- **Newsletter_Form**: A combination of an email input field and a subscribe button
- **Bottom_Bar**: The bottom-most row of the Footer containing copyright text and legal links
- **Social_Icon**: A clickable icon that opens a social media platform URL
- **Dark_Theme**: Aotuflow's visual style — background `#060d1a`, glass morphism cards, blue/purple gradients
- **Glass_Style**: The CSS utility class `.glass` which applies `bg-white/5 backdrop-blur-xl border border-white/10`
- **Gradient_Text**: The CSS utility class `.gradient-text` which applies a blue → purple → pink gradient to text
- **Privacy_Policy_Page**: A new page at route `/privacy` containing Aotuflow's privacy policy content
- **Terms_Page**: A new page at route `/terms` containing Aotuflow's terms of service content

---

## Requirements

### Requirement 1: Footer Layout and Structure

**User Story:** As a visitor, I want to see a well-organized footer, so that I can easily find important information and links about the company.

#### Acceptance Criteria

1. THE Footer SHALL render a responsive grid layout containing a Branding_Section, three Nav_Columns, and a Newsletter_Form
2. WHEN the viewport width is less than 768px, THE Footer SHALL switch to a single-column stacked layout
3. WHEN the viewport width is 768px or greater, THE Footer SHALL render a multi-column layout with a minimum of 4 columns
4. THE Footer SHALL use background color `bg-background/50` or equivalent `#060d1a` and border `border-white/10` to remain visually consistent with the Dark_Theme
5. THE Footer SHALL replace the existing `src/components/Footer.jsx` file so that no import changes are required in LandingPage.jsx

---

### Requirement 2: Branding Section

**User Story:** As a visitor, I want to see Aotuflow's logo and tagline in the footer, so that the brand identity is reinforced and I know I am on the correct website.

#### Acceptance Criteria

1. THE Branding_Section SHALL render the existing `Logo` component from `src/components/Logo.jsx` with the `size="sm"` prop
2. THE Branding_Section SHALL display the tagline text "Automate your growth."
3. THE Branding_Section SHALL render Social_Icons for the following five platforms: Instagram, Facebook, Twitter/X, LinkedIn, and YouTube
4. WHEN a Social_Icon is clicked, THE Footer SHALL open the corresponding social media URL in a new browser tab using `target="_blank"` and `rel="noopener noreferrer"` attributes
5. THE Branding_Section SHALL arrange Social_Icons in a horizontal row

---

### Requirement 3: Navigation Link Columns

**User Story:** As a visitor, I want to see organized link sections in the footer, so that I can easily navigate to product features, company information, and legal pages.

#### Acceptance Criteria

1. THE Footer SHALL render three Nav_Columns with headings: "Product", "Company", and "Legal"
2. THE "Product" Nav_Column SHALL contain the following links: "Features", "Pricing", "Integrations", "Changelog"
3. THE "Company" Nav_Column SHALL contain the following links: "About", "Blog", "Careers", "Contact"
4. THE "Legal" Nav_Column SHALL contain the following links: "Privacy Policy" (route `/privacy`), "Terms of Service" (route `/terms`), "Cookie Policy"
5. WHEN a Nav_Column link is hovered, THE Footer SHALL transition the link color to `text-white` using a CSS transition of 200ms or less
6. THE Footer SHALL use the React Router `<Link>` component for internal routes and the `<a>` tag for external URLs

---

### Requirement 4: Newsletter Signup

**User Story:** As a visitor, I want a newsletter signup option in the footer, so that I can stay connected with Aotuflow's updates and announcements.

#### Acceptance Criteria

1. THE Newsletter_Form SHALL display the heading "Stay in the loop"
2. THE Newsletter_Form SHALL render an email input field with placeholder text "Enter your email"
3. THE Newsletter_Form SHALL render a "Subscribe" button
4. WHEN the user submits the Newsletter_Form with an empty or non-email-format value, THE Newsletter_Form SHALL trigger HTML5 email validation and prevent form submission
5. WHEN the user submits the Newsletter_Form with a valid email address, THE Newsletter_Form SHALL clear the input field and display the success message "Thanks for subscribing!"
6. WHEN the success message is displayed, THE Newsletter_Form SHALL automatically hide the success message after 3000 milliseconds
7. IF the Newsletter_Form submission fails due to a network error, THEN THE Newsletter_Form SHALL display the error message "Something went wrong. Please try again."

---

### Requirement 5: Bottom Bar (Copyright and Legal Links)

**User Story:** As a visitor, I want to see copyright information and legal links at the bottom of the footer, so that I know the content is protected and I can access legal documents.

#### Acceptance Criteria

1. THE Bottom_Bar SHALL dynamically calculate the current year and display copyright text in the format: "© {year} Aotuflow. All rights reserved."
2. THE Bottom_Bar SHALL render clickable links for "Privacy Policy" (route `/privacy`) and "Terms of Service" (route `/terms`)
3. WHEN the viewport width is 768px or greater, THE Bottom_Bar SHALL arrange the copyright text and legal links in a single horizontal row
4. WHEN the viewport width is less than 768px, THE Bottom_Bar SHALL stack the copyright text and legal links vertically with the copyright text above the links
5. THE Bottom_Bar SHALL be visually separated from the rest of the footer content by a `border-t border-white/10` divider line

---

### Requirement 6: Privacy Policy and Terms of Service Pages

**User Story:** As a visitor, I want to access Aotuflow's Privacy Policy and Terms of Service pages, so that I can understand how my data is handled and what rules govern my use of the platform.

#### Acceptance Criteria

1. THE Privacy_Policy_Page SHALL be accessible at the route `/privacy` and render within the existing React Router setup in `src/App.jsx`
2. THE Terms_Page SHALL be accessible at the route `/terms` and render within the existing React Router setup in `src/App.jsx`
3. THE Privacy_Policy_Page SHALL display a heading "Privacy Policy", a last-updated date, and sections covering: data collection, data usage, cookies, third-party services, and user rights
4. THE Terms_Page SHALL display a heading "Terms of Service", a last-updated date, and sections covering: acceptance of terms, use of service, prohibited activities, intellectual property, and limitation of liability
5. THE Privacy_Policy_Page SHALL render the Footer component at the bottom of the page
6. THE Terms_Page SHALL render the Footer component at the bottom of the page
7. THE Privacy_Policy_Page and THE Terms_Page SHALL use the Dark_Theme consistent with the rest of the Aotuflow website

---

### Requirement 7: Visual Design and Theming

**User Story:** As a visitor, I want the footer to be visually consistent with Aotuflow's dark SaaS aesthetic, so that the website looks professionally polished.

#### Acceptance Criteria

1. THE Footer SHALL use `text-gray-400` for secondary text and `text-white` for primary/heading text, consistent with the Dark_Theme
2. THE Footer SHALL apply `font-semibold text-white` styling to Nav_Column headings
3. THE Footer SHALL apply `border-t border-white/10` as the top border to visually separate the footer from the page content above it
4. WHEN any interactive element (link, button, or Social_Icon) is hovered, THE Footer SHALL apply a CSS transition using `transition-colors duration-200`
5. THE Newsletter_Form input field SHALL use Glass_Style (`bg-white/5 border border-white/10 backdrop-blur-xl`) for its styling
6. THE Footer SHALL use only Tailwind CSS utility classes that are compatible with the CSS variables defined in the existing `tailwind.config.js`

---

### Requirement 8: Accessibility

**User Story:** As a developer, I want the footer to be accessible, so that all users including those using assistive technologies can navigate and use the footer.

#### Acceptance Criteria

1. THE Footer SHALL use the semantic HTML `<footer>` element as its root element
2. THE Footer SHALL wrap navigation link groups in a `<nav>` element with an `aria-label` attribute set to "Footer navigation"
3. THE Social_Icons SHALL each have a descriptive `aria-label` attribute (e.g., `aria-label="Follow us on Instagram"`)
4. THE Newsletter_Form input field SHALL have an associated `aria-label` attribute set to "Email address for newsletter"
5. THE Footer SHALL support keyboard navigation so that all interactive elements are reachable and activatable using the Tab and Enter keys
