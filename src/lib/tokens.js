/* Reads a colour token from src/index.css at runtime, for code that can't take
   var(--…) directly (WebGL effects parse plain colour strings). */
export function readToken(name) {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim();
}

/* Maps { prop: "token" | ["token", ...] } to { prop: "#hex" | ["#hex", ...] }. */
export function resolveTokens(map = {}) {
  return Object.fromEntries(
    Object.entries(map).map(([prop, value]) => [
      prop,
      Array.isArray(value) ? value.map(readToken) : readToken(value),
    ]),
  );
}
