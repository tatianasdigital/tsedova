"use client";

import { useEffect, useRef } from "react";
import { parseColor, pickTextColor, readImagePixels, type ContrastLayer } from "@/lib/contrast";

/**
 * Reusable adaptive-contrast controller.
 *
 * Mount it anywhere inside an element marked `data-contrast-scope`
 * (with `data-contrast-base="<css colour>"` = the section background).
 * Inside that scope:
 *   - `data-contrast-layer` on an <img>  → sampled pixel by pixel
 *     (`data-contrast-flip` if it is mirrored with scaleX(-1));
 *     on any other element → its computed background colour.
 *   - `data-adaptive-contrast` on text elements → each one gets black or
 *     white (`color`), decided from what is really painted underneath.
 *     Icons inside should use currentColor so they follow.
 *
 * Re-evaluated on resize (window + ResizeObserver), image load, font
 * load and when entrance animations end — no breakpoints involved.
 */
export function AdaptiveContrast({ dark = "#000000", light = "#ffffff" }: { dark?: string; light?: string }) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = markerRef.current?.closest<HTMLElement>("[data-contrast-scope]");
    if (!scope) return;

    let frame = 0;
    const darkRgb = parseColor(dark).rgb;
    const lightRgb = parseColor(light).rgb;

    const evaluate = () => {
      frame = 0;
      const base = parseColor(scope.dataset.contrastBase ?? getComputedStyle(scope).backgroundColor).rgb;
      const layers: ContrastLayer[] = [];
      scope.querySelectorAll<HTMLElement>("[data-contrast-layer]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (el instanceof HTMLImageElement) {
          const data = readImagePixels(el);
          if (data) layers.push({ kind: "image", rect, data, flipX: el.hasAttribute("data-contrast-flip") });
        } else {
          const { rgb, alpha } = parseColor(getComputedStyle(el).backgroundColor);
          if (alpha > 0) layers.push({ kind: "solid", rect, color: rgb, alpha });
        }
      });

      scope.querySelectorAll<HTMLElement>("[data-adaptive-contrast]").forEach((el) => {
        const tone = pickTextColor(el.getBoundingClientRect(), base, layers, { dark: darkRgb, light: lightRgb });
        el.style.color = tone === "light" ? light : dark;
        el.dataset.contrastTone = tone;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(evaluate);
    };

    schedule();
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(scope);
    const images = Array.from(scope.querySelectorAll<HTMLImageElement>("img[data-contrast-layer]"));
    images.forEach((img) => {
      ro.observe(img);
      img.addEventListener("load", schedule);
    });
    document.fonts?.ready.then(schedule).catch(() => {});
    // entrance animations move the header/portrait → re-check when they finish
    scope.addEventListener("animationend", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      scope.removeEventListener("animationend", schedule);
      images.forEach((img) => img.removeEventListener("load", schedule));
    };
  }, [dark, light]);

  return <span ref={markerRef} hidden />;
}
