import type { CSSProperties } from "react";
import { externalLinks } from "@/content/links";

type Props = {
  tone: "dark" | "light";
  className?: string;
  /**
   * Adaptive colour (see components/ui/AdaptiveContrast): each link is
   * marked for contrast detection and its icon is drawn in currentColor
   * (same SVG, used as a mask) so it changes colour together with the text.
   */
  adaptive?: boolean;
  /** Hover underline under the label, left → right, in the text colour */
  underline?: boolean;
};

const ICON_MASK = "url(/icons/arrow-up-right-black.svg)";
const maskStyle: CSSProperties = {
  maskImage: ICON_MASK,
  WebkitMaskImage: ICON_MASK,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  backgroundColor: "currentColor",
};

/** Behance / LinkedIn / Telegram row. tone="dark" = black text, "light" = white text.
 *  External link icon: 20×20 (Figma px, scales with the layout). */
export function ExternalLinks({ tone, className = "", adaptive = false, underline = false }: Props) {
  const currentColorIcon = adaptive;
  const icon = tone === "dark" ? "/icons/arrow-up-right-black.svg" : "/icons/arrow-up-right-white.svg";
  const color = tone === "dark" ? "text-black" : "text-white";

  return (
    <ul className={`flex items-center gap-28 ${className}`}>
      {externalLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-adaptive-contrast={adaptive || undefined}
            className={`flex items-center gap-4 text-14 uppercase whitespace-nowrap ${color} ${
              adaptive ? "transition-[color] duration-300 ease-out" : ""
            } ${underline ? "u-trigger" : ""}`}
          >
            {/* -mb-[3px] cancels the underline's 3px bottom padding in the flex
                centring, so label and icon stay on one optical level */}
            <span className={underline ? "u-line -mb-[3px]" : undefined}>{link.label}</span>
            {currentColorIcon ? (
              <span aria-hidden className="block size-20 shrink-0" style={maskStyle} />
            ) : (
              <img src={icon} alt="" aria-hidden className="size-20 shrink-0" width={20} height={20} />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
