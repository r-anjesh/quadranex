# Quadranex Website Implementation Plan

## Design sources

- **Project:** Quadranex IT Solutions (`8da4e86c-44d7-4bb2-9cb7-67d9df6f1180`)
- **Drafts:** All five draft HTML documents were fetched with the Superdesign CLI and reviewed for page structure, copy, links, and form fields.
  - **Homepage**, version 1: [Open draft](https://p.superdesign.dev/draft/1f7bf059-2f44-435e-9364-6db08eaa1652) (`1f7bf059-2f44-435e-9364-6db08eaa1652`)
  - **Website Design Services**, version 1: [Open draft](https://p.superdesign.dev/draft/ece3627a-76da-437f-adf1-19266e44e6c9) (`ece3627a-76da-437f-adf1-19266e44e6c9`)
  - **Case Studies & Portfolio**, version 1: [Open draft](https://p.superdesign.dev/draft/d35573be-042c-45ab-b875-08edc373aac2) (`d35573be-042c-45ab-b875-08edc373aac2`)
  - **Consultation Booking**, version 1: [Open draft](https://p.superdesign.dev/draft/cf950f19-af99-41b8-b3eb-a997b7d4747a) (`cf950f19-af99-41b8-b3eb-a997b7d4747a`)
  - **Advanced Digital Solutions**, version 1: [Open draft](https://p.superdesign.dev/draft/b12e558c-a0c4-4fac-8913-d6c1df267771) (`b12e558c-a0c4-4fac-8913-d6c1df267771`)

## Workspace status and planning assumptions

The project is now scaffolded as a React 19, TypeScript, and Vite application with client-side routing. A Python virtual environment is not needed for this frontend-only implementation. The design system and five page routes have been implemented in the workspace.

The supplied Quadranex logo is in use. Customer names, testimonials, and outcome figures still come from the design drafts and need approval before public launch. The booking form opens a consented, prefilled WhatsApp click-to-chat message to the provided number (+91 87002 59557); the customer must review and send it from WhatsApp.

## Shared site structure and behavior

1. **Shared navigation and footer**
   - Brand logo, Home, Services, Case Studies, Contact, and a prominent “Book Strategy Call” action.
   - Keep the active page apparent; provide a compact, keyboard-accessible mobile navigation.
   - Reuse the NavigationBar and FooterQuadranex patterns included in the page drafts.
   - Implemented routes are listed below. Replace every Superdesign preview URL or placeholder destination with a real application path or approved external destination.
2. **Hero and proof metrics**
   - Eyebrow: “Digital Transformation Partner.”
   - Headline: “Build Your Online Presence To Scale Fast.” with “Online Presence” accented.
   - Supporting copy about high-performance websites, design, and maintenance.
   - Primary “Start Growing Now” and secondary “Our Portfolio” actions.
   - Two-column desktop composition with a geometric case-study feature panel; stack cleanly on smaller screens.
   - Follow with four figures: 12+ years experience, 250% average revenue growth, 45+ global partners, and 99.9% uptime reliability. Verify every claim before publication.
3. **Service overview**
   - Heading: “Complete Digital Presence for Growing Businesses.”
   - Six linked cards: Website Design, Digital Presence, SEO & Visibility, Web Performance, Web Maintenance, and Ongoing Support.
   - Use the matching iconography, thin borders, square corners, and the subtle border/lift hover treatment. Cards should remain understandable and usable without hover.
4. **Growth approach and testimonial**
   - Three numbered value points: Market Superiority, Operational Efficiency, and Future-Proofing.
   - Pair with the customer quote and attribution shown in the draft (“Sarah Montgomery”, CTO, Global Logistics Corp); validate permission and wording before launch.
5. **Closing call to action**
   - “Ready to Define Your Digital Legacy?” with supporting audit/roadmap copy and “Schedule Your Free Consultation.”
   - Route the action to the real booking/contact flow.
6. **Footer**
   - Include working destinations and only approved contact/social details.

## Additional page specifications

Implement these alongside the homepage so its service, portfolio, and booking links resolve to real pages. Route paths are suggested and can be adjusted to the selected app's routing conventions.

### Website Design Services — `/services/website-design`

- Lead with “Strategic Website Design Engineered for Growth” and the draft's performance-, SEO-, and conversion-focused value proposition.
- Explain the high-performance architecture and design approach, then present the six benefits: Lightning Speed, Adaptive Layouts, SEO Foundation, Ironclad Security, UX Centricity, and Analytics Ready.
- Show the two draft transformation examples (Global Telehealth Network and NeoBank Enterprise) as case studies with their challenge/solution details; verify organization names and all stated results before publishing.
- Include an accessible Service FAQs section and “Start Your Transformation” CTA to consultation booking.
- Use the shared navigation and footer.

### Case Studies & Portfolio — `/case-studies`

- Open with “Our Success Stories. Real Results, Real Impact” and the portfolio introduction.
- Present four case studies: Lumina Luxury Retails, SyncPath Systems, VaultSecure Bank, and Apex Global Logistics.
- Preserve the draft's industry-specific descriptions and metrics only after verifying the results, customer permissions, and naming rights.
- Make “View Full Case Study” links resolve to implemented detail content or valid case-study anchors; avoid empty or fabricated destinations.
- Close with the “Ready to see your company here?” consultation CTA and the draft's Marcus Chen testimonial, subject to verification and approval.
- Use the shared navigation and footer.

### Consultation Booking — `/contact/book-consultation`

- Use the split layout: “Design Your Growth Path” and the Digital Audit / Custom Proposal benefits and testimonial alongside the booking form.
- Form fields: full name, email, phone, single-select interested service, preferred date, preferred time, and project details. Show the service choices and time windows from the draft.
- Associate visible labels with every field; provide required-field and format validation, keyboard-friendly browser errors, consent before sharing, and a clear WhatsApp handoff state.
- Open a consented WhatsApp click-to-chat message to the supplied business number; customers review and send the message themselves. The local timezone is included with the preferred time.
- Verify the David Chen quote and attribution before publication. Reuse the shared navigation and footer.

### Advanced Digital Solutions — `/services/advanced`

- Lead with “Advanced Solutions for Digital Dominance” and the EcomXtra featured solution.
- Describe e-commerce capabilities, including checkout performance and ERP/warehouse integrations; replace the draft's `#` EcomXtra link with its verified destination.
- Present continuous-support offerings: Security Shield, Core Optimization, and On-Demand Support, retaining the listed operational details only if confirmed.
- Include Advanced Growth Acceleration: Digital Footprint Audit, Omnichannel Presence, and Analytics Evolution.
- Verify the Marcus Chen / TechFlow Inc testimonial and its 40% speed-improvement claim. Route “Schedule a Systems Audit” to the real booking flow.
- Use the shared navigation and footer.

## Visual system

- **Palette:** primary blue `#0052CC`, deep navy `#001F5C`, pale blue `#E6F0FF`, white `#FFFFFF`, muted text `#404040`, and borders `#D1D5DB`.
- **Typography:** Space Grotesk for primary interface/headings; Poppins for supporting copy. Outfit is included by the source draft but has no clearly established role; only use it if the implemented design needs it.
- **Character:** generous white space, strong blue/navy contrast, sharp square-edged surfaces, restrained geometric accents, and uppercase tracked labels/actions.
- **Layout:** centered content with a roughly 7xl maximum-width container; desktop hero split layout; 3-column service grid on wide screens and progressively fewer columns on smaller screens.
- **Motion:** brief hover transitions for service cards and buttons. Respect `prefers-reduced-motion`; do not make motion necessary to discover content.

## Implementation sequence

### 1. Establish the application foundation

- [x] Scaffold React, TypeScript, Vite, and client-side routing.
- [x] Create the application shell and routes for all five pages.
- [x] Add design tokens and responsive typography.
- [x] Replace the placeholder wordmark with the supplied Quadranex logo.
- [ ] Add approved case-study imagery.

**Exit criteria:** the application runs locally and all five routes resolve. Replace/approve brand assets before launch.

### 2. Build shared chrome and responsive page sections

- [x] Implement shared responsive navigation and footer across the pages.
- [x] Build the homepage, website design service page, portfolio, consultation booking form, and advanced-solutions page.
- [x] Recreate the draft hierarchy and styling; smoke-test all five routes at mobile width with no horizontal overflow.
- [x] Use the supplied Quadranex logo in the shared header and footer.
- [x] Add non-searchable single-service/time dropdowns and a calendar picker; lazy-load their UI libraries with the booking form.
- [x] Add reduced-motion-aware route and action feedback animations; put the form first on narrow screens and reset page navigation to the top.
- [x] Wire internal service, portfolio, and booking flows; no preview-draft URLs remain in application source.
- [x] Add booking-form validation, explicit consent, and a WhatsApp handoff state with a fallback link if the new tab is blocked.
- [x] Configure a no-backend WhatsApp click-to-chat handoff to the supplied number. Customers explicitly consent and must send the prepared message themselves.

**Exit criteria:** all five pages are present and responsive. The customer can review and manually send a prepared booking request in WhatsApp.

### 3. Verify content, accessibility, and quality

- [ ] Confirm homepage metric values, all testimonials, case-study names/results and permissions, EcomXtra destination, and logo with the business owner.
- [x] Add semantic landmarks, headings, labeled fields, keyboard-accessible navigation, focus styling, and reduced-motion support.
- [x] Add route-specific page titles and descriptions.
- [ ] Compare each rendered page against its Superdesign draft at desktop, tablet, and mobile widths; route/responsiveness smoke checks have been completed at 320, 390, 768, and 1280 pixels.
- [x] Run the linter and production TypeScript/build check; both pass.
- [ ] Add or run a test suite once project test cases are defined.

**Exit criteria:** draft content and assets are approved and visual review is complete before launch. The build and lint pass; the form accurately explains the WhatsApp handoff and does not imply a message was sent.

## Acceptance checklist

- [x] All five pages implement the documented content, and shared navigation/footer work across them.
- [x] Responsive navigation and interactive content work without relying on hover.
- [x] Homepage, service, portfolio, and booking CTAs lead to valid destinations.
- [x] The booking form validates and clearly reports that it opens a WhatsApp draft, without claiming the message was sent.
- [x] The booking form includes a single-service picker with text search disabled, and a calendar date picker.
- [x] Booking navigation presents the form at the start on mobile; route and control interactions use subtle, reduced-motion-aware transitions.
- [x] Brand colors, typography, sharp geometry, and whitespace follow the corresponding drafts.
- [x] Supplied logo is in use.
- [ ] Metrics, testimonials, and case-study content are approved.
- [ ] Accessibility, SEO metadata, and responsive checks are complete.
- [ ] Lint, type-check, build, and relevant tests pass for the chosen application stack.
