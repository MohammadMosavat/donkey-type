/**
 * localStorage read that is safe during the static export prerender,
 * where there is no `window`.
 */
export const getLocalItem = (key: string): string | null =>
  typeof window === "undefined" ? null : window.localStorage.getItem(key);
