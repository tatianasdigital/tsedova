import type { CSSProperties } from "react";
import type { ImageCrop } from "@/types";

type Props = {
  src: string;
  alt: string;
  /** Circle diameter in Figma px */
  size: number;
  /** Image geometry relative to the circle, in Figma px (from Figma) */
  crop: ImageCrop;
  className?: string;
  /** Optional entrance (see lib/motion `reveal`) */
  reveal?: { "data-reveal": string; style: CSSProperties };
};

const u = (n: number) => `calc(var(--u) * ${n})`;

/** Circular portrait on #dfdfe8, reproducing the Figma mask framing. */
export function AvatarCircle({ src, alt, size, crop, className = "", reveal }: Props) {
  return (
    <div
      data-reveal={reveal?.["data-reveal"]}
      className={`overflow-hidden rounded-full bg-avatar-bg ${className || "relative"}`}
      style={{ ...reveal?.style, width: u(size), height: u(size) }}
    >
      <img
        src={src}
        alt={alt}
        className="pointer-events-none absolute object-fill"
        style={{ left: u(crop.left), top: u(crop.top), width: u(crop.width), height: u(crop.height) }}
      />
    </div>
  );
}
