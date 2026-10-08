import type { CareerItem } from "@/types";

/** Rows visible before "show all" */
export const careerVisible: CareerItem[] = [
  { years: "2024", role: "UI/UX Designer", company: "Kampela Start-up", industry: "cryptocurrency" },
  {
    years: "2021-2022",
    role: "UX/UI-designer / Communication designer",
    company: "Right.studio",
    industry: "design agency",
  },
  { years: "2021", role: "UX/UI-designer / Illustrator", company: "Self-employed", industry: "Self-employed" },
  {
    years: "2018-2020",
    role: "UX/UI-designer / Product designer",
    company: "Idaproject",
    industry: "design agency",
  },
];

/**
 * Rows revealed by "show all" (from the CV).
 * TODO(content): role titles for these positions were not supplied —
 * add `role` when available; the Role cell stays empty until then.
 */
export const careerHidden: CareerItem[] = [
  { years: "2017-2018", company: "Selado", industry: "digital marketing agency" },
  { years: "2014-2017", company: "Sagenta", industry: "digital marketing agency" },
  { years: "2013-2014", company: "uCoz.com", industry: "digital SaaS" },
  { years: "2011-2013", company: "Iligent", industry: "digital marketing agency" },
];
