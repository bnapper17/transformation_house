# Butterfly Transformation House

Website for Butterfly Transformation House, a faith-based halfway house and
sober living program in Laconia, Indiana. Built with Next.js (App Router),
TypeScript, and Tailwind CSS.

## Pages

| Route          | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `/`            | Home                                                                |
| `/program`     | Program overview (Vision, Church Services, Meetings)                |
| `/testimonies` | Testimonies from past residents                                     |
| `/giving`      | Donation form (collects intent via email — no payment processing yet, see below) |
| `/contact`     | Contact info + message form                                        |
| `/apply`       | Program application form                                           |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local` (not committed — see `.gitignore`) and fill in:

| Variable                   | Required | Purpose                                                                 |
| --------------------------- | -------- | ------------------------------------------------------------------------ |
| `SMTP_HOST`                 | Yes      | SMTP server host (e.g. `smtp.gmail.com`)                                |
| `SMTP_PORT`                 | Yes      | SMTP port (e.g. `465`)                                                  |
| `SMTP_USER`                 | Yes      | SMTP account username                                                    |
| `SMTP_PASS`                 | Yes      | SMTP account password / app password                                     |
| `SMTP_FROM`                 | No       | "From" address on outgoing mail; defaults to `SMTP_USER`                |
| `CONTACT_RECIPIENT_EMAIL`   | No       | Where Contact/Apply/Giving submissions are delivered; defaults to `castbyfire@gmail.com` |
| `NEXT_PUBLIC_SITE_URL`      | No       | Canonical site URL used in the sitemap and metadata; falls back to Vercel's `VERCEL_URL`, then `localhost:3000` |
| `NEXT_PUBLIC_SITE_IS_LIVE`  | No       | Set to `"true"` only once real content/photos are final and the production domain is live — see below |

Without the `SMTP_*` variables, the Contact/Apply/Giving forms still render
and validate normally, but submission will fail with a handled error (nothing
crashes — there's just nowhere to send the email).

### `NEXT_PUBLIC_SITE_IS_LIVE`

This site currently has placeholder content (the Program page's body copy is
still lorem ipsum, and some photos are expected to change). `robots.txt` and
page-level `<meta name="robots">` tags are **set to block search indexing by
default** so this doesn't get crawled/cached prematurely. Once the real
content and final domain are in place, set `NEXT_PUBLIC_SITE_IS_LIVE=true` in
the deployment environment to allow indexing.

## Email

Contact, Apply, and Giving submissions all send formatted emails via
`lib/mailer.ts` (nodemailer over SMTP) rather than a third-party service —
see the env vars above to configure.

**Giving page note:** the donation form is built with Stripe in mind (preset
amounts, "give anonymously" option) but does not process payments yet. For
now it only emails the donation intent — real card processing requires a
Stripe account and integration work.

## SEO

- `app/robots.ts` / `app/sitemap.ts` — generated from code, gated by
  `NEXT_PUBLIC_SITE_IS_LIVE`
- Per-page `metadata` exports (title/description) on every route
- `NGO` JSON-LD structured data in the root layout (`app/layout.tsx`), sourced
  from `lib/contactInfo.ts`

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [Nodemailer](https://nodemailer.com) for transactional email
- TypeScript

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to `main` triggers a build;
remember to set the environment variables above in the Vercel project
settings — `.env.local` is not committed and won't carry over automatically.
