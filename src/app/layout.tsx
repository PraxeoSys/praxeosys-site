import Script from "next/script";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          // Runs once, before paint, to avoid a flash of the wrong theme.
          // Lives in this top-level root layout — which never re-renders on
          // locale-switch navigation — rather than in [locale]/layout.tsx.
          // A <script> (raw or next/script) inside a segment that gets
          // re-rendered client-side hits React's "no <script> during client
          // render" restriction and silently fails to apply, which was
          // resetting the theme on every locale switch.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var r=document.documentElement;if(t==='light'){r.classList.remove('dark');r.classList.add('light');r.setAttribute('data-theme','light');}else if(t==='dark'){r.classList.add('dark');r.classList.remove('light');r.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
