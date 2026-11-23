import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Instrument_Sans, EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DESCRIPTION, GITHUB, LINKEDIN, SITE_URL, TITLE } from '@/components/issue/site'
import 'lenis/dist/lenis.css'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})
// Instrument Serif has no Greek letters; the coin legends use EB Garamond's Greek subset.
const greek = EB_Garamond({
  subsets: ['greek'],
  weight: '500',
  variable: '--font-greek',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Raif Mondal',
    locale: 'en_IN',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f0e8',
}

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raif Mondal',
  url: `${SITE_URL}/`,
  jobTitle: 'Founder & CEO',
  worksFor: { '@type': 'Organization', name: 'IndiQuant' },
  address: { '@type': 'PostalAddress', addressLocality: 'Navi Mumbai', addressCountry: 'IN' },
  sameAs: [LINKEDIN, GITHUB],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${instrumentSans.variable} ${greek.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint, so reveal animations only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
