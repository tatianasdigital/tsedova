export const SECTION_IDS = {
  about: "about",
  works: "works",
  career: "career",
  contact: "contact",
} as const;

/** Homepage anchor link, usable from any page */
export const homeAnchor = (id: string) => `/#${id}`;

export const projectHref = (slug: string) => `/${slug}`;

export const BACK_TO_WORKS = homeAnchor(SECTION_IDS.works);
