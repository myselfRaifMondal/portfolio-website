import type { Metadata, Viewport } from 'next'
import { Newsreader, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: 'Raif Mondal | Founder of IndiQuant | Quantitative AI',
  description: 'Raif Mondal — founder of IndiQuant. Autonomous quantitative intelligence systems for institutional capital markets.',
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
  themeColor: '#ece9e3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
