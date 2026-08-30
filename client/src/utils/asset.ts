/**
 * Prefix a public asset path with the deployment base path.
 *
 * `next/image` and `next/link` apply `basePath` automatically, but raw
 * strings (ReactSVG, <img>, new Audio(), metadata icons) do not, so they
 * must go through this helper to keep working on a GitHub Pages project site.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
