import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import { Header } from '@/components/header';

import { tagged as javascript } from 'foxts/tagged';
import { DarkModeProvider } from '@/lib/themes';

import 'modern-normalize/modern-normalize.css';
import './globals.css';
import 'stylex-webpack/stylex.css';

import * as stylex from '@stylexjs/stylex';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap'
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap'
});

/*
  ((document, darkThemeColor, lightThemeColor) => {
    try {
      const mode = localStorage['user-color-scheme'];
      if (mode === 'light' || mode === 'dark') {
        document.documentElement.classList.add(mode);
      }
      const isDark = mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.querySelectorAll('meta[name="theme-color"]').forEach(
        el => el.setAttribute('content', isDark ? darkThemeColor : lightThemeColor)
      );
    } catch (e) {};
  })(document, '#111111', '#ffffff')
*/
const themeScript = javascript`((d,t,l)=>{try{const m=localStorage["user-color-scheme"];(m==="light"||m==="dark")&&d.documentElement.classList.add(m);const i=m==="dark"||(!m&&window.matchMedia("(prefers-color-scheme: dark)").matches);d.querySelectorAll('meta[name="theme-color"]').forEach(e=>e.setAttribute("content",i?t:l))}catch(e){}})(document,"#111111","#ffffff");`;

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
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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

export const metadata: Metadata = {
  title: 'Weight2Fit - Made by Sukka',
  description: 'Convert body composition data to a Garmin-compatible .fit file, entirely in-browser.'
};
