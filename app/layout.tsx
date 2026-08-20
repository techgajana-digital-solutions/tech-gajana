import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google';
import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.techgajana.org'), 

  title: {
    default: 'TechGajana - Software, Mentorship & Tech Innovation',
    template: '%s | TechGajana',
  },
  description:
    'TechGajana delivers professional software development, live mentorship courses, an e-commerce tech store, and research publishing for students and builders looking to grow their skills and ship real products.',
  keywords: [
    'TechGajana Pvt. Ltd.',
    'TechGajana Private Limited',
    'TechGajana',
    'software development',
    'tech mentorship',
    'live coding courses',
    'e-commerce tech store',
    'research publishing',
    'student tech mentorship',
    'software solutions',
  ],
  authors: [{ name: 'TechGajana' }],
  creator: 'TechGajana',
  publisher: 'TechGajana',
  generator: 'TechGajana',

  manifest: '/manifest.json',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: 'https://www.techgajana.org',
    siteName: 'TechGajana',
    title: 'TechGajana - Software, Mentorship & Tech Innovation',
    description:
      'Professional tech solutions including software development, live mentorship courses, e-commerce tech store, and research publishing for students and builders.',
    images: [
      {
        url: '/tg.png', // recommend 1200x630
        width: 1200,
        height: 630,
        alt: 'TechGajana - Software, Mentorship & Tech Innovation',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TechGajana - Software, Mentorship & Tech Innovation',
    description:
      'Professional tech solutions including software development, live mentorship courses, e-commerce tech store, and research publishing for students and builders.',
    images: ['/tg.png'],
    // creator: '@yourhandle',
  },

  category: 'technology',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4F46E5',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const clarity_project_id = "y56ixbquyr";

  useEffect(() => {
    Clarity.init(clarity_project_id);
  }, []);

  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="apple-mobile-web-app-title" content="TechGajana" />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  )
}
