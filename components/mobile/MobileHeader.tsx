"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { navItems, externalLinks } from "@/content/links";
import { homeAnchor } from "@/lib/routes";

type Props = {
  /** "light" = black text (homepage hero), "dark" = white text (project page) */
  tone: "light" | "dark";
};

const mask = (src: string) => ({ "--icon": `url(${src})` }) as CSSProperties;

/** Logo — Figma 90:1092: Bebas 24px, 24px box (text box 28px, top −2px) */
function Logo({ color }: { color: string }) {
  return (
    <Link href="/" className={`relative block h-24 w-135 shrink-0 ${color}`} aria-label="Tatiana Sedova — home">
      <span className="absolute -top-2 left-0 font-display text-24 leading-normal whitespace-nowrap uppercase">
        Tatiana — Sedova
      </span>
    </Link>
  );
}

/**
 * Mobile header (Figma 92:1135 / 98:1696) + full-screen menu (Figma 98:1634).
 * The menu is portalled to <body> (so transformed ancestors from entrance
 * animations can't trap the fixed overlay), locks page scroll while open,
 * closes on link tap, Esc, or when the window grows to desktop width.
 */
export function MobileHeader({ tone }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  /** Page header's distance from the top (px) — the menu header copies it */
  const [top, setTop] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const color = tone === "light" ? "text-black" : "text-white";

  useEffect(() => setMounted(true), []);

  const unlock = () => {
    document.documentElement.style.overflow = "";
  };

  const close = useCallback(() => {
    unlock();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBp = () => desktop.matches && close();
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBp);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBp);
      openRef.current?.focus({ preventScroll: true });
    };
  }, [open, close]);

  return (
    <>
      <div ref={rowRef} className="flex items-start justify-between">
        <Logo color={color} />
        <button
          ref={openRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            // Put the menu header exactly over the page header (16px on the
            // homepage, 20px on project pages) so nothing jumps on open/close.
            const r = rowRef.current?.getBoundingClientRect();
            if (r) setTop(r.top >= 0 ? r.top : r.top + window.scrollY);
            setOpen(true);
          }}
          /* 24px visual height, ~44px touch target via padding/negative margin */
          className={`-my-10 -mr-10 flex cursor-pointer items-center gap-10 py-10 pr-10 pl-16 ${color}`}
        >
          <span className="text-14 uppercase">Menu</span>
          <span aria-hidden className="icon-mask size-24 shrink-0" style={mask("/icons/menu.svg")} />
        </button>
      </div>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            aria-hidden={!open}
            inert={!open}
            className={`m-menu m-scope fixed inset-0 z-[90] overflow-y-auto bg-black text-white md:hidden ${open ? "is-open" : ""}`}
          >
            <div className="relative mx-auto min-h-full w-full max-w-[calc(var(--u)*390)] pb-[env(safe-area-inset-bottom)]">
              {/* Header row — same place as the page header it covers */}
              <div
                className="m-menu-fade flex items-start justify-between px-16 pt-20"
                style={top !== null ? { paddingTop: top } : undefined}
              >
                <Logo color="text-white" />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="-my-10 -mr-10 flex cursor-pointer items-center gap-10 py-10 pr-10 pl-16 text-white"
                >
                  <span className="text-14 uppercase">Close</span>
                  <span aria-hidden className="icon-mask size-24 shrink-0" style={mask("/icons/close.svg")} />
                </button>
              </div>

              {/* Menu links — Figma 98:1650: Bebas 64 / 0.9, gap 12, top 96 (= header top + 24 + this padding) */}
              <nav
                aria-label="Mobile"
                className="px-16 pt-52"
                style={top !== null ? { paddingTop: `calc(var(--u) * 72 - ${top}px)` } : undefined}
              >
                <ul className="flex flex-col gap-12">
                  {navItems.map((item, i) => (
                    <li
                      key={item.anchor}
                      data-menu-item
                      style={{ "--menu-delay": `${80 + i * 60}ms` } as CSSProperties}
                    >
                      <Link
                        href={homeAnchor(item.anchor)}
                        onClick={close}
                        className="block font-display text-64 leading-[0.9] uppercase"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* External links — Figma 98:1651, 24px from the bottom (18 + the 6px tap padding) */}
              <ul className="absolute bottom-[calc(var(--u)*18+env(safe-area-inset-bottom))] left-16 flex flex-col">
                {externalLinks.map((link, i) => (
                  <li key={link.href} data-menu-item style={{ "--menu-delay": `${320 + i * 50}ms` } as CSSProperties}>
                    {/* 17px text + 12px gap → 6px padding each side keeps the Figma rhythm with a bigger tap area */}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 py-6 text-14 whitespace-nowrap text-white uppercase"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="icon-mask size-16 shrink-0"
                        style={mask("/icons/arrow-up-right-black.svg")}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
