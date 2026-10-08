export type ExternalLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  /** Homepage anchor id, without "#" */
  anchor: string;
};

/** Geometry of an image inside its clipping frame, in Figma px. */
export type ImageCrop = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type HeroGalleryItem = {
  src: string;
  alt: string;
  /** Optional Figma crop of the image inside the 397×320 gallery frame. */
  crop?: ImageCrop;
};

export type HeroLabelData = {
  text: string;
  /** Path to the icon (SVG/PNG) in /public — replaceable without code changes */
  iconSrc: string;
  /** Rendered icon size in Figma px */
  iconSize: number;
  /** Mobile badge icon (Figma 95:1147 "flashlight-fill"), 16px */
  mobileIconSrc?: string;
};

export type SkillTag = {
  text: string;
  title: string;
  /** Position inside the 1648×736 SkillTagCloud, in Figma px */
  x: number;
  y: number;
  /** Mobile position inside the 350×578 mobile SkillTagCloud (Figma 98:1603) */
  mx: number;
  my: number;
};

export type InfoCard = {
  title: string;
  text: string;
};

export type CareerItem = {
  years: string;
  role?: string;
  company: string;
  industry: string;
};

export type WorkCardShape = "square" | "tall";

export type Project = {
  slug: string;
  title: string;
  year: string;
  cardImage: string;
  /** Mobile work-card image (square, from the mobile Figma); falls back to cardImage */
  cardImageMobile?: string;
  description?: string;
  areas?: string[];
  tools?: string[];
  projectType?: string;
  behanceUrl?: string;
  images?: string[];
};
