# PixelForge Studio

A responsive, single-page portfolio for a personal web studio. It presents frontend skills, selected projects, information about the studio and its workflow, and a contact form. The page is built with semantic HTML, CSS, and vanilla JavaScript.

## Features

- Responsive layout with section navigation and a mobile menu that closes when a link is selected or Escape is pressed.
- A keyboard skip link to the main content.
- Sections for skills, project cards, studio information, workflow, and contact.
- A contact form with required name, email, and message fields, client-side validation, submission status, and a disabled submit button while sending.

## Project files

- `index.html` — Portfolio content, project links, and semantic structure.
- `styles.css` — Design tokens, responsive layout, component styling, and reduced-motion rules.
- `main.js` — Responsive navigation, form validation, and Formspree submission.
- `assets/images/` — Three project-card images: `coffee-house.jpg`, `gaming-store.jpg`, and `nova-group.jpg`.
- `assets/icons/` — Currently empty; reserved for future icon assets. Decorative icons are inline SVG in `index.html`.

## Technologies

- HTML for semantic page structure and the contact form.
- CSS for responsive layouts, visual styling, and motion preferences.
- Vanilla JavaScript for the mobile menu and form submission.
- Formspree for the external contact-form endpoint.
- Local JPEG images and inline SVG graphics.

## Preview

Open `index.html` in a browser for a visual preview. No build step or package installation is required.

The project cards link to the Coffee House, Gaming Store, and NOVA GROUP project pages. The contact form is configured to submit the required `name`, `email`, and `message` fields to Formspree at `https://formspree.io/f/mqpqqlrz`. Submitting it requires JavaScript, network access, and an available Formspree endpoint.
