'use client';

import { useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { tagged as javascript } from 'foxts/tagged';

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

export function ThemeScript() {
  const isInsertedRef = useRef(false);

  useServerInsertedHTML(() => {
    if (isInsertedRef.current) {
      return null;
    }

    isInsertedRef.current = true;
    // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- The script is a static, trusted string defined above.
    return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
  });

  return null;
}
