import type { Project } from "@/types";

/**
 * Projects, in WorksGrid order (left/right, row by row).
 * Change a slug here and the route + card link follow automatically.
 *
 * Project-page images (Figma ImageGrid, already framed):
 *   images[]        desktop, 1028 × 830 frame — files 2056 × 1660 (2×)
 *   imagesMobile[]  mobile,   358 × 289 frame — files 1074 × 867 (3×)
 * Replace the files in /public/images/works/<slug>/ with the same names.
 *
 * `description` — "\n\n" starts a new paragraph (blank line, as in Figma).
 * Fields left undefined are simply not rendered on the project page.
 */
const pageImages = (slug: string, count: number) => ({
  images: Array.from({ length: count }, (_, i) => `/images/works/${slug}/${String(i + 1).padStart(2, "0")}.jpg`),
  imagesMobile: Array.from({ length: count }, (_, i) => `/images/works/${slug}/${String(i + 1).padStart(2, "0")}-mobile.jpg`),
});

export const works: Project[] = [
  {
    // Figma: desktop 118:997, mobile 118:2523
    slug: "lake-saimaa",
    title: "Lake Saimaa — Tourism Website",
    year: "2026",
    cardImage: "/images/works/lake-saimaa/card.jpg",
    cardImageMobile: "/images/works/lake-saimaa/card-mobile.jpg",
    areas: ["Website", "UX/UI"],
    tools: ["Figma"],
    projectType: "Concept",
    description:
      "A modern tourism website designed to showcase the beauty, activities, and destinations of Lake Saimaa. The goal was to create an engaging visual experience that inspires visitors to explore the region.",
    // behanceUrl: TODO(content) — case-study link not supplied yet
    ...pageImages("lake-saimaa", 3),
  },
  {
    // Figma: desktop 115:157, mobile 118:2415
    slug: "property-rental-website",
    title: "Property rental website",
    year: "2026",
    cardImage: "/images/works/property-rental-website/card.jpg",
    cardImageMobile: "/images/works/property-rental-website/card-mobile.jpg",
    areas: ["Website", "UX/UI"],
    tools: ["Figma", "After Effects"],
    projectType: "Concept",
    description:
      "A rental housing website designed for young people under 30. The goal was to create a fresh, modern, and approachable digital experience that makes finding and managing a home simple and engaging.",
    ...pageImages("property-rental-website", 3),
  },
  {
    // Figma: desktop 116:742, mobile 118:2729
    slug: "medieval-farming-app",
    title: "Medieval Farming App",
    year: "2021",
    cardImage: "/images/works/medieval-farming-app/card.jpg",
    cardImageMobile: "/images/works/medieval-farming-app/card-mobile.jpg",
    areas: ["Mobile", "App", "UX/UI"],
    tools: ["Figma", "Photoshop", "After Effects"],
    projectType: "Competition Project",
    description:
      "A UX/UI project created for the Russian Design Cup, where I took 1st place.\n\nThe goal was to design a useful digital tool for medieval farmers, helping them manage agricultural processes and monitor key data such as crops, soil, pests, and expected yields.",
    ...pageImages("medieval-farming-app", 2),
  },
  {
    // Figma: desktop 115:268, mobile 118:2625
    slug: "smart-chat",
    title: "Smart Chat",
    year: "2020",
    cardImage: "/images/works/smart-chat/card.jpg",
    cardImageMobile: "/images/works/smart-chat/card-mobile.jpg",
    areas: ["Mobile", "App", "UX/UI"],
    tools: ["Figma"],
    projectType: "Competition Project",
    description:
      "A UX/UI project created for the Russian Design Cup, where I took 1st place.\n\nThe challenge was to design a unified chat platform that brings personal, work, and other conversations together in one place, with a clear and intuitive interface for managing multiple types of communication.",
    ...pageImages("smart-chat", 2),
  },
];

export const getProject = (slug: string) => works.find((w) => w.slug === slug);
