import type { CSSProperties } from "react";

type Props = {
  text: string;
  /** Seconds for the track to travel one group (2 copies). Larger = slower. */
  duration?: number;
  /** Seconds before the marquee starts moving (e.g. after an entrance fade) */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Infinite right-to-left marquee for the hero title.
 *
 * The track holds two identical groups, each with two copies of the title,
 * and moves by exactly −50% (one group) per cycle with a linear timing
 * function, so the restart is pixel-identical — no visible jump. One group
 * is always wider than the viewport, so the strip is never empty.
 * The parent clips the overflow.
 *
 * prefers-reduced-motion: no animation, a single static title centred in
 * the strip (the Figma composition) — see .hero-marquee in globals.css.
 */
export function HeroTitleMarquee({ text, duration = 40, delay = 0, className = "", style }: Props) {
  const copy = (key: string, hidden: boolean) => (
    <span key={key} aria-hidden={hidden || undefined} className="hero-marquee-item">
      {text}
    </span>
  );

  return (
    <div className={`hero-marquee overflow-hidden ${className}`} style={style}>
      <h1 className="sr-only">{text}</h1>
      <div
        aria-hidden
        className="hero-marquee-track"
        style={{ "--marquee-duration": `${duration}s`, "--marquee-delay": `${delay}s` } as CSSProperties}
      >
        <div className="hero-marquee-group">
          {copy("a1", false)}
          {copy("a2", true)}
        </div>
        <div className="hero-marquee-group hero-marquee-dup">
          {copy("b1", true)}
          {copy("b2", true)}
        </div>
      </div>
    </div>
  );
}
