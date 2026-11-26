# Bharat IPO Intelligence

**Know the company before you invest.**

Independent, evidence-led research on Indian companies and IPOs. This first milestone establishes the editorial standard and a runnable interface before live market claims are introduced.

## Phase 1 foundation

- Responsive research homepage with IPO status tabs, source labels and methodology framework.
- Search and quick-search interactions, mobile navigation and light/dark theme.
- Fictional company profile preview. It contains no issuer facts, figures, offer terms or citations.
- IPO feed intentionally empty until primary-source checks are connected.
- Small Node.js server and built-in tests; no third-party runtime packages required.

## Run locally

Requires Node.js 20 or later. Run `npm start`, then open `http://127.0.0.1:4173`. Run checks with `npm test`.

## Hosting and public release

The static page can be published from the `main` branch root on GitHub Pages without a build step. Its relative asset links support the project URL. On GitHub Free, GitHub Pages requires a public repository, which makes the repository files and published site visible to everyone. Check that no private information or access keys are stored in the repository before enabling public hosting.

GitHub says Pages is not intended for running an online business or commercial SaaS. Treat it as a non-commercial preview only; move the service to an appropriate host before adding paid or commercial features. See [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Current limits

No database, authentication, live IPO feed, document storage, PDF extraction, AI provider, admin dashboard, user analytics or payment flow is connected. The interface does not collect user data. No market facts are presented as verified.
