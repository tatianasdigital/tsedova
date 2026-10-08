# Tatiana Sedova — Portfolio (desktop)

Next.js 16 · TypeScript · Tailwind CSS v4. Desktop-only first build from Figma
`CV-Cover-letter` (homepage 63:673, WorkPage 63:674).

## Run locally (Windows / macOS / Linux)

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # TypeScript only
```

## How the fluid layout works

- `--u` (in `app/globals.css`) = one Figma pixel: `clamp(1024px, 100vw, 2560px) / 1728`.
- Tailwind's spacing scale is bound to `--u`, so `w-814`, `pt-40`, `gap-20` are
  Figma values that scale with the viewport. Font sizes: `text-14`, `text-16`,
  `text-20` (with legibility minimums), `text-36`, `text-40`, `text-160`,
  `text-300`, `text-340`.
- Above 2560px content stops growing and centres; backgrounds stay full-width.
  Between 768 and 1024px the desktop layout keeps its 1024px minimum.

## Mobile (< 768px)

Separate composition from the mobile Figma (390 × 844): homepage 98:1633,
menu 98:1634, project page 98:1851.

- Switch: `components/layout/Responsive.tsx` — `DesktopOnly` (`display:
  contents` from 768px, so the desktop renders exactly as before) and
  `MobileOnly` (adds `.m-scope`). Section anchors (#about, #works, #career,
  #contact) sit on shared wrappers in `app/page.tsx`.
- Inside `.m-scope` the unit `--u` = one pixel of the 390px frame
  (`clamp(320px, 100vw, 480px) / 390`), so `w-358`, `p-16`, `text-86` are
  mobile Figma values that scale between 320 and 480px.
- Components: `components/mobile/` — `MobileHeader` (+ full-screen menu),
  `MobileFirstScreen`, `MobileSections` (About, Works, Career, Contact),
  `MobileCareerTable`, `MobileExternalLinks`, `MobileWorkPage`.
- Same data as desktop. Mobile-only fields: `skillTags[].mx/my`,
  `heroLabel.mobileIconSrc`, `heroPortraitMobile`, `works[].cardImageMobile`.
- Heavy images of the other layout are never downloaded (`<picture>` with a
  1px placeholder source for the other breakpoint).
- No hover/cursor effects on mobile; tap targets ≥ ~40px.
- First Screen (Figma 81:678, 1920×1080 reference): `height: 100dvh`. Own
  units, set in `components/hero/FirstScreen.tsx`:
  `--fu` = width/1920, `--vu` = height/1080, `--s` = min(fu, vu) (gallery,
  bottom offsets, middle row), `--t` = min(fu, 1.15·vu) (title + label),
  `--p` = min(vu, 1.15·fu) (portrait). On 16:9 all equal → exact Figma.
- Hero title: infinite marquee (`components/hero/HeroTitleMarquee.tsx`,
  `duration` prop = speed); static and centred with prefers-reduced-motion.
- Adaptive header colour: `components/ui/AdaptiveContrast.tsx` +
  `lib/contrast.ts`. Samples the real pixels under every header word (portrait
  PNG + section background) and picks black/white by WCAG contrast; reruns on
  resize. Mark layers with `data-contrast-layer`, text with
  `data-adaptive-contrast` (Header `adaptive` prop does this).
- Motion (all off with prefers-reduced-motion; no animation libraries):
  - tokens in `app/globals.css` → `--ease-out`, `--ease-fade`, `--enter-duration` (1100ms),
    `--enter-distance` (56px), `--hero-duration` (950ms), `--hover-duration` (250ms);
    scroll entrances trigger when an element reaches ~75% of the viewport;
  - First Screen entrance: CSS classes `enter-from-above` / `enter-from-below`
    with `--enter-delay` (timeline in `FirstScreen.tsx`); marquee starts after
    the title (`delay` prop);
  - WorkPage: same classes, blocks enter from above one after another
    (timeline in `components/works/WorkPage.tsx`); images below the fold use
    the scroll reveal;
  - scroll entrances: add `{...reveal("from-above" | "from-below" | "fade" |
    "ring", delayMs)}` from `lib/motion.ts`; `components/motion/RevealObserver`
    plays each once (IntersectionObserver). `data-reveal-group` makes a
    container reveal all its items together (stagger via delay);
  - `components/motion/SmoothWheel.tsx`: light easing of mouse-wheel steps
    only (touchpad, keyboard, anchors stay native);
  - `components/motion/FollowCursor.tsx`: Figma cursor-buttons
    (`public/icons/cursor-view.svg`, used on work cards and the email).
- Title/content overlap: `components/ui/OverlapSection.tsx` (sticky title in a
  1.5× track; content pulled up by 50% of the title height, above it in z-order).

## Where to change things

| What | File |
|---|---|
| Projects (slug, title, year, images, details) | `content/works.ts` |
| Career rows (visible + "show all") | `content/career.ts` |
| Skill tags + positions | `content/skills.ts` |
| Hero, About, Contact texts, hero gallery, label icon | `content/home.ts` |
| Email, nav, external links | `content/links.ts` |
| Colours, scale, type sizes | `app/globals.css` |
| Fonts | `styles/fonts.css` |

## Assets to replace

All placeholders are plain files — replace them with the same name (or change
the path in `content/`), no layout changes needed.

| File(s) | Slot | Frame proportion |
|---|---|---|
| `public/images/works/<slug>/card.svg` | Work cards (grey) | left cards 1:1, right cards 814:1082 |
| `public/images/works/<slug>/01–03.svg` | Project page images (grey) | 1028:830 |
| `public/images/hero/gallery-1/2/3.png` | Hero gallery | 442:356 (≈1.24:1), already framed; 884×712 px or larger. Filled edge to edge, no crop. Optional `position` / `crop` per item in `content/home.ts` |
| `public/icons/hero-label-flash.svg` | "Open for work" icon (desktop + mobile) | change `heroLabel.iconSrc` / `mobileIconSrc` to swap |
| `public/images/portrait.png` | Hero / About / Contact portrait (from Figma) | — |
| `public/images/portrait-hero-mobile.webp` | Mobile hero portrait | 644 × 879 frame, cover |
| `public/images/works/<slug>/card-mobile.jpg` | Mobile work cards (images from the mobile Figma) | 1:1 |

## Fonts

- **Bebas Neue** — final, self-hosted via `@fontsource/bebas-neue`.
- **PP Neue Montreal Medium — ⚠️ TEMPORARY FALLBACK (Inter Tight 500).**
  Put the licensed files in `public/fonts/` and uncomment the `@font-face`
  block in `styles/fonts.css`.

## Open items

- Lake Saimaa description is taken from the Figma WorkPage. Descriptions and
  details for the other 3 projects, and all Behance case-study URLs, are not
  supplied. The Behance button links to the profile ("View on Behance") until
  `behanceUrl` is set, then shows the Figma label.
- Role titles for the 2011–2018 career rows — not supplied (cell left empty).
- "show all" toggles to "show less" on a second click.
- Mobile Figma shows "2018 - 2021" for Idaproject; the data (desktop, CV) says
  2018-2020 — left as in the data, change `content/career.ts` if needed.
- Mobile project page: the Figma shows the work-card mockup as the first
  image of Lake Saimaa; the page uses `images[]` from the data (placeholders)
  like desktop.
