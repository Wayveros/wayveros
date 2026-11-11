# WAYVEROS platform foundation

Private implementation foundation for the WAYVEROS travel-planning platform. This is a development starter, not a production-ready service.

## What's included
- Next.js 15 + React 19 + TypeScript scaffold
- Supabase server-side client using the current `sb_secret_...` key format
- Trip-request validation and `POST /api/trips` endpoint
- Admin itinerary-approval endpoint with a temporary server-token guard
- Reference SQL schema for customers, trip requests, itineraries, status history, payment events and email logs
- Existing static visual prototype under `public/demo/`

## Supabase configuration
Set these server/environment variables in your deployment provider:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (safe for browser use; not currently needed by the server-only route)
- `SUPABASE_SECRET_KEY` (server-only; never prefix with `NEXT_PUBLIC_`, never commit it)
- `INTERNAL_ADMIN_APPROVAL_TOKEN` (temporary development guard only)

The Supabase project and seven tables have already been created manually. **Do not run `supabase/schema.sql` again on that existing project**; keep it as a reference for code review and future migrations. Confirm the actual database schema before deploying because SQL changes made in the dashboard may differ from this reference file.

## Run locally
1. Install Node.js 20.
2. Copy `.env.example` to `.env.local` and fill in the values securely.
3. Run `npm install`.
4. Run `npm run dev`.

## API
`POST /api/trips` accepts JSON fields: `packageName`, `destination`, optional `startDate` and `endDate`, `travelers`, optional `budget` and `preferences`, `customerName`, `customerEmail`. It creates/updates a customer by email and inserts a trip request.

`POST /api/admin/trips/:id/approve` requires the `x-wayveros-admin-token` header and a JSON body containing a reviewed `itinerary` string. This temporary guard is not a substitute for real admin authentication.

## Important before launch
- Implement Supabase Auth, verified customer sessions, password reset and server-side admin roles. Replace the temporary token guard.
- Confirm database columns and constraints match the SQL used to create the live Supabase tables.
- Add rate limiting, bot protection, privacy/consent text and audit logging.
- Implement a selected payment provider with signed webhook verification and idempotency. Payment is not active.
- Implement AI itinerary generation as a server-side job, prompt/version logging and human review. AI generation is not active.
- Implement email delivery, retries and PDF generation/storage. Email and PDF delivery are not active.
- Add automated tests, monitoring, backups and deployment configuration.

## Current truth
The public prototype in `public/demo/` is static HTML. The trip API is a starter integration, not yet connected to the website form. No payment, AI, customer login, admin login, email delivery or PDF delivery is live. No credentials are included in this repository.
