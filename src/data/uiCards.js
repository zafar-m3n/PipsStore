/* Worked examples and reference facts shown in the product-style UI cards.
   Illustrative values are labelled "Example" wherever they appear; the
   arithmetic is real so a beginner can check it. */

/* EUR/USD is quoted in USD, so one pip on one standard lot is exactly $10. */
export const PIP_EXAMPLE = {
  pair: "EUR/USD",
  lots: 1,
  units: "100,000",
  pipSize: "0.0001",
  pipValue: 10,
};

/* The 1% rule on a small account: the stop distance decides the size. */
export const RISK_EXAMPLE = {
  account: 1000,
  riskPct: 1,
  stopPips: 20,
  pipValuePerLot: 10,
};

export function riskMath({ account, riskPct, stopPips, pipValuePerLot }) {
  const risk = (account * riskPct) / 100;
  const lots = risk / (stopPips * pipValuePerLot);
  return { risk, lots, kept: 100 - riskPct };
}

/* Main trading sessions in UTC (approximate; they shift an hour with DST). */
export const SESSIONS = [
  { city: "Sydney", open: 22, close: 7 },
  { city: "Tokyo", open: 0, close: 9 },
  { city: "London", open: 8, close: 17 },
  { city: "New York", open: 13, close: 22 },
];

export const CALENDAR_EXAMPLE = {
  event: "Consumer Price Index (CPI)",
  country: "US",
  impact: 3,
  watch: "Prices react to the surprise: compare the actual figure with the forecast, not just the number itself.",
};
