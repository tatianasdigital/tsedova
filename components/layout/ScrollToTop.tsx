"use client";

import { useLayoutEffect } from "react";

/**
 * Opens a page at scroll position 0, instantly (no smooth scroll), whenever it
 * is entered by client-side navigation — e.g. a WorkCard click from the
 * middle of the homepage. Skipped when the URL has a #hash (anchor links keep
 * their target).
 */
export function ScrollToTop() {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, []);
  return null;
}
