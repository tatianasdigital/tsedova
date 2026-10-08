import type { SkillTag } from "@/types";

/**
 * x/y: desktop, Figma px inside the 1648×736 SkillTagCloud.
 * mx/my: mobile, Figma px inside the 350×578 mobile SkillTagCloud.
 */
export const skillTags: SkillTag[] = [
  { text: "Smart design solutions", title: "Creative Thinking", x: 278, y: 191, mx: 123, my: 0 },
  { text: "Websites from scratch", title: "Web Expertise", x: 1061, y: 101, mx: 6, my: 446 },
  { text: "Degree in Marketing", title: "Marketing Background", x: 1192, y: 403, mx: 141, my: 542 },
  { text: "Agencies & startups", title: "Diverse Experience", x: 67, y: 461, mx: 0, my: 86 },
  { text: "AI-assisted design", title: "AI Workflow", x: 437, y: 658, mx: 185, my: 371 },
];
