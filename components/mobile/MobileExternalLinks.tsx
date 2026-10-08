import type { CSSProperties } from "react";
import { externalLinks } from "@/content/links";

/**
 * Contact-section links on mobile — Figma 97:1587: centred column, gap 24,
 * 14px white text + 16px icon. Each link gets a 12px vertical padding
 * instead of the 24px gap (same rhythm, ~41px tap target); the list's
 * −12px margin keeps the outer spacing exactly as in Figma.
 */
export function MobileExternalLinks() {
  return (
    <ul className="-my-12 flex flex-col items-center">
      {externalLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-12 text-14 whitespace-nowrap text-white uppercase"
          >
            {link.label}
            <span
              aria-hidden
              className="icon-mask size-16 shrink-0"
              style={{ "--icon": "url(/icons/arrow-up-right-black.svg)" } as CSSProperties}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
