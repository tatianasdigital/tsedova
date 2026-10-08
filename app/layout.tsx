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

/**
 * Runs before first paint: enables the hidden "before reveal" states only
 * when JS is available and the user has not asked for reduced motion.
 */
const revealGate = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-reveal')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
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
