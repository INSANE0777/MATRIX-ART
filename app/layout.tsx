import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'GitHub Matrix Art Generator - Create Pixel Art from Commits',
    template: '%s | GitHub Matrix Art'
  },
  description: 'Create stunning pixel art in your GitHub contribution graph with our AI-powered matrix generator. Generate commit scripts for custom text, logos, and patterns.',
  keywords: [
    'GitHub',
    'contribution graph',
    'pixel art',
    'matrix generator',
    'commit art',
    'GitHub art',
    'contribution visualization',
    'GitHub profile',
    'pixel text',
    'commit script',
    'GitHub matrix',
    'open source',
    'developer tools'
  ],
  authors: [{ name: 'Afjal Hussein', url: 'https://github.com/AFJAL-HUSSEIN' }],
  creator: 'Afjal Hussein',
  publisher: 'GitHub Matrix Art',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://github-matrix-art.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GitHub Matrix Art Generator',
    description: 'Create stunning pixel art in your GitHub contribution graph with our AI-powered matrix generator.',
    url: 'https://matrix-art.vercel.app/',
    siteName: 'GitHub Matrix Art',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub Matrix Art Generator Preview',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Matrix Art Generator',
    description: 'Create stunning pixel art in your GitHub contribution graph with our AI-powered matrix generator.',
    images: ['/twitter-image.png'],
    creator: '@afjal_codes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'GitHub Matrix Art Generator',
              description: 'Create stunning pixel art in your GitHub contribution graph',
              url: 'https://matrix-art.vercel.app/',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              creator: {
                '@type': 'Person',
                name: 'Afjal Hussein',
                url: 'https://github.com/AFJAL-HUSSEIN'
              },
              featureList: [
                'GitHub contribution graph art',
                'Pixel text generation',
                'Custom patterns',
                'Commit script generation',
                'Real-time preview'
              ]
            })
          }}
        />
        
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}