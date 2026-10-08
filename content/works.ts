import type { Project } from "@/types";

/**
 * Projects, in WorksGrid order (left/right, row by row).
 * Change a slug here and the route + card link follow automatically.
 * Images are grey placeholders — replace the files in
 * /public/images/works/<slug>/ (or edit the paths).
 *
 * Only supplied content is filled in. Fields left undefined are simply
 * not rendered on the project page.
 */
export const works: Project[] = [
  {
    slug: "lake-saimaa",
    title: "Lake Saimaa — Tourism Website",
    year: "2026",
    cardImage: "/images/works/lake-saimaa/card.svg",
    cardImageMobile: "/images/works/lake-saimaa/card-mobile.jpg",
    areas: ["Website", "UX/UI"],
    tools: ["Figma"],
    projectType: "Concept",
    description:
      "A modern tourism website designed to showcase the beauty, activities, and destinations of Lake Saimaa. The goal was to create an engaging visual experience that inspires visitors to explore the region.",
    // behanceUrl: TODO(content) — case-study link not supplied yet
    images: [
      "/images/works/lake-saimaa/01.svg",
      "/images/works/lake-saimaa/02.svg",
      "/images/works/lake-saimaa/03.svg",
    ],
  },
  {
    slug: "property-rental-website",
    title: "Property rental website",
    year: "2026",
    cardImage: "/images/works/property-rental-website/card.svg",
    cardImageMobile: "/images/works/property-rental-website/card-mobile.jpg",
    images: [
      "/images/works/property-rental-website/01.svg",
      "/images/works/property-rental-website/02.svg",
      "/images/works/property-rental-website/03.svg",
    ],
  },
  {
    slug: "medieval-farming-app",
    title: "Medieval Farming App",
    year: "2021",
    cardImage: "/images/works/medieval-farming-app/card.svg",
    cardImageMobile: "/images/works/medieval-farming-app/card-mobile.jpg",
    images: [
      "/images/works/medieval-farming-app/01.svg",
      "/images/works/medieval-farming-app/02.svg",
      "/images/works/medieval-farming-app/03.svg",
    ],
  },
  {
    slug: "smart-chat",
    title: "Smart Chat",
    year: "2020",
    cardImage: "/images/works/smart-chat/card.svg",
    cardImageMobile: "/images/works/smart-chat/card-mobile.jpg",
    images: [
      "/images/works/smart-chat/01.svg",
      "/images/works/smart-chat/02.svg",
      "/images/works/smart-chat/03.svg",
    ],
  },
];

export const getProject = (slug: string) => works.find((w) => w.slug === slug);
