import type { ExternalLink, NavItem } from "@/types";

export const EMAIL = "tatianasdigital@gmail.com";

export const externalLinks: ExternalLink[] = [
  { label: "Behance", href: "https://www.behance.net/tatianaseda" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tatiana-sedova" },
  { label: "Telegram", href: "https://t.me/tatiana_ss" },
];

export const BEHANCE_PROFILE = externalLinks[0].href;

export const navItems: NavItem[] = [
  { label: "About me", anchor: "about" },
  { label: "Works", anchor: "works" },
  { label: "Career Journey", anchor: "career" },
  { label: "Contact", anchor: "contact" },
];
