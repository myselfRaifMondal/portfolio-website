import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'lenis/dist/lenis.css'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
});

export const metadata: Metadata = {
  title: 'Raif Mondal | Founder & CEO, IndiQuant',
  description: 'Raif Mondal, Founder & CEO of IndiQuant. Twenty-two, Navi Mumbai. I build systems that trade, so that discipline never depends on mood.',
  generator: 'v0.app',
  openGraph: {
    title: 'Raif Mondal | Building IndiQuant',
    description: 'Founder building quantitative AI infrastructure, research systems, and execution architecture for capital markets.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raif Mondal | IndiQuant',
    description: 'Founder building quantitative AI infrastructure for capital markets.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f0e8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${instrumentSans.variable}`}>
      <body className="antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
