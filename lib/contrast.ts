/**
 * Adaptive-contrast helpers.
 *
 * Reconstructs the colour that is actually painted under a given screen
 * point from:
 *   - a base background colour (the section background), and
 *   - "layers" painted above it: images (sampled pixel-by-pixel, alpha
 *     composited, including CSS mirroring) or solid elements.
 * Then picks black or white text — whichever keeps the best *worst-case*
 * WCAG contrast across the whole text box.
 */

export type RGB = [number, number, number];

export type ContrastLayer =
  | { kind: "image"; rect: DOMRect; data: ImageData; flipX: boolean }
  | { kind: "solid"; rect: DOMRect; color: RGB; alpha: number };

export const BLACK: RGB = [0, 0, 0];
export const WHITE: RGB = [255, 255, 255];

export function parseColor(input: string): { rgb: RGB; alpha: number } {
  const s = input.trim();
  if (s.startsWith("#")) {
    const hex = s.length === 4 ? s.slice(1).replace(/./g, (c) => c + c) : s.slice(1, 7);
    const n = parseInt(hex, 16);
    return { rgb: [(n >> 16) & 255, (n >> 8) & 255, n & 255], alpha: 1 };
  }
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { rgb: [p[0], p[1], p[2]], alpha: p.length > 3 ? p[3] : 1 };
  }
  return { rgb: [255, 255, 255], alpha: 0 };
}

/** WCAG relative luminance */
export function luminance([r, g, b]: RGB): number {
  const f = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrastRatio(a: RGB, b: RGB): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const pixelCache = new WeakMap<HTMLImageElement, ImageData>();

/** Decoded pixels of a same-origin image (cached). null until loaded. */
export function readImagePixels(img: HTMLImageElement): ImageData | null {
  const cached = pixelCache.get(img);
  if (cached) return cached;
  if (!img.complete || !img.naturalWidth) return null;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixelCache.set(img, data);
    return data;
  } catch {
    return null; // cross-origin or decode failure → treat as no layer
  }
}

function blend(under: RGB, over: RGB, a: number): RGB {
  return [
    under[0] * (1 - a) + over[0] * a,
    under[1] * (1 - a) + over[1] * a,
    under[2] * (1 - a) + over[2] * a,
  ];
}

/** Colour actually painted at viewport point (x, y). */
export function colorAt(x: number, y: number, base: RGB, layers: ContrastLayer[]): RGB {
  let c: RGB = base;
  for (const layer of layers) {
    const r = layer.rect;
    if (x < r.left || x >= r.right || y < r.top || y >= r.bottom) continue;
    if (layer.kind === "solid") {
      c = blend(c, layer.color, layer.alpha);
      continue;
    }
    // Image drawn with object-fit: fill → linear mapping (mirrored if flipX)
    let u = (x - r.left) / r.width;
    const v = (y - r.top) / r.height;
    if (layer.flipX) u = 1 - u;
    const { data, width, height } = layer.data;
    const px = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
    const py = Math.min(height - 1, Math.max(0, Math.floor(v * height)));
    const i = (py * width + px) * 4;
    const a = data[i + 3] / 255;
    if (a > 0) c = blend(c, [data[i], data[i + 1], data[i + 2]], a);
  }
  return c;
}

/**
 * Choose the text colour for a box: the candidate whose *lowest* contrast
 * over a grid of sample points is highest (so no part of the word
 * becomes unreadable).
 */
export function pickTextColor(
  box: DOMRect,
  base: RGB,
  layers: ContrastLayer[],
  candidates: { dark: RGB; light: RGB } = { dark: BLACK, light: WHITE },
  grid: [number, number] = [12, 5],
): "dark" | "light" {
  const [cols, rows] = grid;
  let minDark = Infinity;
  let minLight = Infinity;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = box.left + ((i + 0.5) / cols) * box.width;
      const y = box.top + ((j + 0.5) / rows) * box.height;
      const bg = colorAt(x, y, base, layers);
      minDark = Math.min(minDark, contrastRatio(candidates.dark, bg));
      minLight = Math.min(minLight, contrastRatio(candidates.light, bg));
    }
  }
  return minLight > minDark ? "light" : "dark";
}
