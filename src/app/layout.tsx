import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { ThemeScript } from '@/components/theme-script';

import { DarkModeProvider } from '@/lib/themes';

import 'modern-normalize/modern-normalize.css';
import './globals.css';
import 'stylex-webpack/stylex.css';

import * as stylex from '@stylexjs/stylex';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
});

const styles = stylex.create({
  wrap: {
    maxWidth: '560px',
    marginBlock: '0',
    marginInline: 'auto',
    padding: {
      default: '0 32px 100px',
      '@media (max-width: 540px)': '0 20px 80px'
    }
  }
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <DarkModeProvider>
          <div {...stylex.props(styles.wrap)}>
            <Header />
            {children}
          </div>
        </DarkModeProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  // <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // <meta name="theme-color" content="#fffff" media="(prefers-color-scheme: light)" />
  // <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
  themeColor: [
    { color: '#fffff', media: '(prefers-color-scheme: light)' },
    { color: '#111111', media: '(prefers-color-scheme: dark)' }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://w2fit.skk.moe/'),
  title: 'Weight2Fit - Made by Sukka',
  description: 'Convert body composition data into a Garmin-compatible `.fit` file — entirely in your browser, with no server involved.',
  icons: {
    // <link href="https://cdn.skk.moe/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
    apple: {
      url: 'https://cdn.skk.moe/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png'
    },
    icon: [
      // <link href="https://cdn.skk.moe/favicon/android-chrome-192x192.png" rel="icon" type="image/png" sizes="192x192" />
      {
        url: 'https://cdn.skk.moe/favicon/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      // <link href="https://cdn.skk.moe/favicon/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
      {
        url: 'https://cdn.skk.moe/favicon/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32'
      },
      // <link href="https://cdn.skk.moe/favicon/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
      {
        url: 'https://cdn.skk.moe/favicon/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16'
      },
      {
        url: 'https://cdn.skk.moe/favicon.ico',
        type: 'image/ico'
      }
      // <link href="https://cdn.skk.moe/favicon/safari-pinned-tab.svg" rel="mask-icon" color="#fcfcfc" />
      // No longer supported
    ]
  },
  openGraph: {
    title: 'Weight2Fit - Made by Sukka',
    siteName: 'Weight2Fit - Made by Sukka',
    url: 'https://w2fit.skk.moe/',
    description: 'Convert body composition data into a Garmin-compatible `.fit` file — entirely in your browser, with no server involved.',
    type: 'website'
  },
  robots: {
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1
  },
  other: {
    'fediverse:creator': '@sukka@acg.mn'
  },
  formatDetection: {
    // <meta content="telephone=no" name="format-detection" />
    telephone: false
  }
};
