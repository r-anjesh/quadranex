# Quadranex IT Solutions

Responsive multi-page website built with React, TypeScript, and Vite. The shared header and footer use the original supplied Quadranex logo image; the consultation form uses non-searchable service and time dropdowns and a calendar picker.

## Run locally

```sh
npm install
npm run dev
```

Available routes:

- `/` — Homepage
- `/services/website-design` — Website design services
- `/services/advanced` — Advanced digital solutions
- `/case-studies` — Portfolio and case studies
- `/contact/book-consultation` — Consultation request form

## Consultation form integration

The consultation form validates in the browser and opens a prefilled WhatsApp message to **+91 87002 59557**. Visitors can choose one interested service; the dropdowns do not allow text entry, and preferred time includes an ASAP (within 30 minutes) option. No server, API key, or Python virtual environment is required. The form appears first on mobile, and footer booking links take visitors directly to the form, including when already on the booking page. The customer reviews the message and must tap **Send** in WhatsApp; submitting the website form alone does not contact Quadranex. The date/time message includes the customer's local time zone.

The form requires the customer to consent before opening WhatsApp. The entered contact and project details are included in the WhatsApp click-to-chat URL so that WhatsApp can prefill the message; be aware URLs may be processed by the browser and WhatsApp. Review the privacy notice and relevant privacy requirements before publishing.

To change the destination, update the `whatsappNumber` constant in `src/App.tsx` to the country code and phone number as digits only (no `+`, spaces, or punctuation), then rebuild/redeploy the site.

## Checks

```sh
npm run lint
npm run build
```

## Draft content

The case-study names, metrics, testimonials, and brand details currently follow the supplied design drafts. Confirm customer permissions and factual claims before public launch.
