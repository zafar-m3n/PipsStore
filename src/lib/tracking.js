/* ============================================================
   Ad-click tracking.
   On app mount we capture gclid / keyword / loc_physical from the
   URL query string into sessionStorage. The contact form reads
   them back on submit and clears them after a successful send.
   ============================================================ */

const STORAGE_KEY = "pips_ad_tracking";

const FIELD_MAP = {
  gclid: "gclid",
  keyword: "keyword",
  loc_physical: "location",
  loc_physical_ms: "location",
};

/** Read current query params and persist any ad-tracking values. */
export function captureAdTracking(search = window.location.search) {
  try {
    const params = new URLSearchParams(search);
    const existing = getAdTracking();
    let changed = false;

    for (const [param, key] of Object.entries(FIELD_MAP)) {
      const value = params.get(param);
      if (value && !existing[key]) {
        existing[key] = value;
        changed = true;
      }
    }

    if (changed) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
    return existing;
  } catch {
    return {};
  }
}

/** Return the stored ad-tracking object ({} when nothing captured). */
export function getAdTracking() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Wipe stored ad-tracking data (called after a successful submit). */
export function clearAdTracking() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
