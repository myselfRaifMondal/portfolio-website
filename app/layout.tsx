import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Raif Mondal | Founder of IndiQuant | Quantitative AI',
  description: 'Raif Mondal is building IndiQuant: autonomous quantitative intelligence systems for institutional capital markets.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
