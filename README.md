# raifmondal.xyz

Personal site of Raif Mondal, Founder & CEO of IndiQuant. It is set as a single-page editorial magazine, "The Founder Issue".

## Stack

- Next.js 16 (App Router) with `output: 'export'`: the build is plain static HTML in `out/`.
- React 19, CSS Modules, Instrument Serif and Instrument Sans via `next/font`.
- Lenis for smooth scrolling, Radix Dialog for the booking and contact dialogs, Vercel Analytics.

## Where things live

- `app/layout.tsx`: fonts, metadata, structured data.
- `app/icon.svg`, `public/og.png`, `public/apple-touch-icon.png`: tab icon, share image and iPhone icon.
- `app/not-found.tsx`: the 404 page.
- `components/issue/`: the page itself. `site.ts` holds the email, Calendly and social links.
- `vercel.json`: apex-to-www redirect and security headers.
- `public/`: share image, iPhone icon, `robots.txt` and `sitemap.xml`.

## Develop

```bash
pnpm install
pnpm dev
```

```bash
pnpm typecheck
pnpm build
```

## Deploy

Vercel deploys `main` to https://www.raifmondal.xyz and builds a preview for every pull request.
