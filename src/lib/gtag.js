/* ============================================================
   Google Ads conversion helper.
   gtag.js itself is loaded in index.html. This fires a single
   "conversion" event on a successful contact-form submission,
   triggered once from the Thank You page.
   ============================================================ */

// Placeholder — replace with the real "AW-XXXXXXX/label" send-to value.
const CONVERSION_SEND_TO = "AW-XXXXXXX/PipsStoreContactLabel";
const CONVERSION_VALUE = 1.0;
const CONVERSION_CURRENCY = "USD";

export function fireContactConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "conversion", {
    send_to: CONVERSION_SEND_TO,
    value: CONVERSION_VALUE,
    currency: CONVERSION_CURRENCY,
  });
}
