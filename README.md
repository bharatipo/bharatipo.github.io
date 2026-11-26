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

## Current limits

No database, authentication, live IPO feed, document storage, PDF extraction, AI provider, admin dashboard, user analytics or payment flow is connected. The interface does not collect user data. No market facts are presented as verified.

## Roadmap

1. **Foundation (current):** public interface, research labels and company/IPO layouts. Next: application framework and database schema.
2. **Research:** source-linked company profiles, financial statements, transparent calculations and peer context.
3. **Intelligence:** document storage and extraction, source-page tracking, inconsistency flags and human-reviewed draft reports.
4. **Editorial operations:** secure admin review, audit history, monitoring, backups and scheduled source checks.
5. **Launch preparation:** qualified legal review, privacy/security checks, mobile and accessibility review, SEO and hosting.

Suggested production direction: Next.js with TypeScript, PostgreSQL, private object storage for source documents, and a modular extraction service. Keep credentials in server-side environment variables. Choose hosting and managed services when MVP scope and budget are clear.

## Research standard

Prioritize SEBI, NSE, BSE, issuer filings, audited annual reports, MCA records and official court or regulator records. Secondary coverage can help locate a source but does not replace it.

Each important published item should retain its source title, link, page or section, filing date, verification date, information classification and review history. Distinguish disclosed facts, verified facts, calculations, issuer guidance, third-party estimates, independent analysis and unverified information. Describe allegations, pending cases and final findings separately. AI drafts must never publish without human review.

## Later integrations

The initial static foundation needs no API keys. Later phases may need a PostgreSQL host, private document storage, secure authentication, a model provider for assisted extraction, error monitoring and a production host. Defer accounts and payments until the core research workflow is reliable.

Before publication, add reviewed privacy, terms, source/copyright, correction and risk-disclosure pages. Do not claim SEBI registration or provide personalized recommendations without qualified regulatory review.
