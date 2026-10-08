import type { HeroGalleryItem, HeroLabelData, InfoCard } from "@/types";

/* ---------- First screen ---------- */

export const heroTitle = "UX/UI DESIGNER";

export const heroPortrait = {
  // Figma crop of the 1536×2048 source (hero only; About/Contact keep portrait.png)
  src: "/images/portrait-hero.png",
  alt: "Tatiana Sedova",
};

export const heroLabel: HeroLabelData = {
  text: "open for work",
  // Figma 81:705 / 95:1147 "flashlight-fill" — same icon on desktop (20px) and mobile (16px)
  iconSrc: "/icons/hero-label-flash.svg",
  iconSize: 20,
  mobileIconSrc: "/icons/hero-label-flash.svg",
};

/** Mobile hero portrait (Figma 95:1141: same photo, hi-res, tone-matched to the Figma fill) */
export const heroPortraitMobile = {
  src: "/images/portrait-hero-mobile.webp",
  alt: "Tatiana Sedova",
};

/**
 * Exactly three images, shown in the 442 × 356 Gallery frame (Figma 81:682).
 * Supply them already framed at the frame's proportion (442:356 ≈ 1.24:1),
 * ideally 884 × 712 px or larger — they then fill the frame edge to edge with
 * no extra crop or enlargement. Replace the files in /public/images/hero/
 * (or change the paths here) — no component changes needed.
 *
 * Optional per image: `position` (object-position, default "50% 50%") picks
 * which part stays visible if an image has a different proportion, and
 * `crop` places an un-framed (oversized) export exactly as in Figma.
 */
export const heroGallery: [HeroGalleryItem, HeroGalleryItem, HeroGalleryItem] = [
  { src: "/images/hero/gallery-1.png", alt: "" },
  { src: "/images/hero/gallery-2.png", alt: "" },
  { src: "/images/hero/gallery-3.png", alt: "" },
];

export const heroFeatures = {
  title: "What I do",
  columns: [["Landing pages", "websites", "interfaces"], ["UX + UI"]],
};

export const heroAwards = {
  title: "Awards",
  items: ["1st Place Winner — Russian Design Cup"],
};

/* ---------- About ---------- */

export const aboutInfoCards: InfoCard[] = [
  { title: "Based", text: "Vantaa, Finland (UTC+3)" },
  { title: "Languages", text: "English, Finnish, Russian" },
];

export const aboutAvatar = {
  src: "/images/portrait.png",
  alt: "Tatiana Sedova",
};

export const aboutYears = {
  numberGraphic: "/images/eleven.svg",
  plusGraphic: "/images/plus.svg",
  numberLabel: "11+",
  text: "years of combined experience in web, digital marketing, and UX/UI.",
};

export const aboutText = {
  title: "About",
  text: "I’m a UX/UI Designer passionate about creating digital experiences that are both beautiful and easy to use. With 5+ years of experience, I turn ideas and complex challenges into clear, engaging, and purposeful designs.",
};

/* ---------- Career ---------- */

export const careerIntro = {
  title: "My experience",
  text: "From web and digital marketing to UX/UI design — combining business, creativity, and user experience.",
};

/* ---------- Contact ---------- */

export const contactContent = {
  title: "Let’s work together",
  avatar: { src: "/images/portrait.png", alt: "Tatiana Sedova" },
  credits: "Designed & built by Tatiana Sedova",
  tools: "Figma + Open AI + Claude",
  year: "2026",
};
