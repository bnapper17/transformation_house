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
| `/giving`      | Redirects to the Vanco online giving page (`GIVING_URL` in `lib/contactInfo.ts`) |
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
| `SMTP_HOST`                 | Yes      | SMTP server host (`smtp.gmail.com`)                                      |
| `SMTP_PORT`                 | Yes      | SMTP port (e.g. `465`)                                                  |
| `SMTP_USER`                 | Yes      | Gmail address that sends the form emails                                  |
| `SMTP_PASS`                 | Yes      | Gmail App Password for that account (requires 2-Step Verification)        |
| `SMTP_FROM`                 | No       | "From" address on outgoing mail; defaults to `SMTP_USER`                |
| `CONTACT_RECIPIENT_EMAIL`   | No       | Where Contact/Apply submissions are delivered; defaults to `CONTACT_EMAIL` in `lib/contactInfo.ts` |
| `NEXT_PUBLIC_SITE_URL`      | No       | Production URL (e.g. `https://example.org`) used for canonical links, the sitemap and share previews; falls back to Vercel's production domain, then `localhost:3000` |
| `NEXT_PUBLIC_SITE_IS_LIVE`  | No       | Set to `"true"` only once real content/photos are final and the production domain is live — see below |

Without the `SMTP_*` variables, the Contact/Apply forms still render
and validate normally, but submission will fail with a handled error (nothing
crashes — there's just nowhere to send the email).

### `NEXT_PUBLIC_SITE_IS_LIVE`

Some photos (e.g. the Program page's church and meeting images) are still
placeholders. `robots.txt` and
page-level `<meta name="robots">` tags are **set to block search indexing by
default** so this doesn't get crawled/cached prematurely. Once the real
content and final domain are in place, set `NEXT_PUBLIC_SITE_IS_LIVE=true` in
the deployment environment to allow indexing.

## Email

Contact and Apply submissions send formatted emails via `lib/mailer.ts`
(nodemailer over SMTP through the organization's Gmail account) rather than a
third-party service — see the env vars above to configure.

- **Reply-to** is set to the visitor's email, so replying from the inbox goes
  to them rather than back to the site's own account.
- **Spam:** both forms include a hidden honeypot field (`lib/honeypot.ts`,
  `components/HoneypotField.tsx`). Submissions that fill it in get a normal
  success response but no email is sent.

## Giving

Online giving is handled by Vanco. Every giving link points at `GIVING_URL`
in `lib/contactInfo.ts`, and `/giving` redirects there (`next.config.ts`)
for old links and bookmarks — change the URL in that one place.

## SEO

- `lib/seo.ts` holds the shared pieces: service areas (towns, counties,
  regions), services offered, keywords, the share image, and
  `pageMetadata()`, which gives each page its title, description, canonical
  URL and Open Graph (Facebook/text-message preview) tags
- `app/robots.ts` / `app/sitemap.ts` — generated from code, gated by
  `NEXT_PUBLIC_SITE_IS_LIVE`
- `NGO` + `LocalBusiness` JSON-LD in the root layout (`app/layout.tsx`) with
  address, phones, `areaServed` and a service list
- The home page's "Christian Sober Living in Southern Indiana" section is the
  visible text that local searches match — keep the towns there in step with
  `SERVICE_AREAS`
- After launch: verify the site in Google Search Console and submit
  `/sitemap.xml`, and claim a Google Business Profile for the Laconia address

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
