import type { Metadata } from "next";
import "@fontsource/bebas-neue/400.css";
// TEMPORARY fallback for PP Neue Montreal Medium — see styles/fonts.css
import "@fontsource/inter-tight/500.css";
import "./globals.css";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothWheel } from "@/components/motion/SmoothWheel";

export const metadata: Metadata = {
  title: "Tatiana Sedova — UX/UI Designer",
  description: "Portfolio of Tatiana Sedova, UX/UI designer based in Vantaa, Finland.",
};

/** Google tag (Google Tag Manager container GTM-MWM2P8QS) — first thing in <head> on every page */
const GOOGLE_TAG_ID = "GTM-MWM2P8QS";
const googleTagInit = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`;

/**
 * Runs before first paint: enables the hidden "before reveal" states only
 * when JS is available and the user has not asked for reduced motion.
 */
const revealGate = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-reveal')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Google tag — one per page, right after <head> */}
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: googleTagInit }} />
        <script dangerouslySetInnerHTML={{ __html: revealGate }} />
      </head>
      <body>
        {children}
        <RevealObserver />
        <SmoothWheel />
      </body>
    </html>
  );
}
