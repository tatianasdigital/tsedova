import type { CareerItem } from "@/types";

/** Rows visible before "show all" */
export const careerVisible: CareerItem[] = [
  { years: "2024", role: "UI/UX Designer", company: "Kampela Start-up", industry: "cryptocurrency" },
  {
    years: "2022",
    role: "UX/UI-designer / Communication designer",
    company: "Right.studio",
    industry: "Digital Design Agency",
  },
  {
    years: "2021-2022",
    role: "UX/UI-designer / Illustrator",
    company: "Self-employed",
    industry: "Educational Projects",
  },
  {
    years: "2018-2020",
    role: "UX/UI-designer / Product designer",
    company: "Idaproject",
    industry: "Digital Design Agency",
  },
];

/** Rows revealed by "show all" */
export const careerHidden: CareerItem[] = [
  {
    years: "2017-2018",
    role: "SEO Specialist / Webmaster / Website Developer",
    company: "Selado",
    industry: "digital marketing agency",
  },
  { years: "2014-2017", role: "SEO Specialist / Webmaster", company: "Sagenta", industry: "digital marketing agency" },
  {
    years: "2013-2014",
    role: "Digital Marketing Specialist (assistant) / Webmaster",
    company: "uCoz.com",
    industry: "SaaS website builder",
  },
  { years: "2011-2013", role: "SEO Specialist (assistant)", company: "Iligent", industry: "digital marketing agency" },
];
