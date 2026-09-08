/* Tools page: calculator metadata + shared currency-pair reference data.

   pipValuePerLot = USD value of 1 pip for 1.00 standard lot (100,000 units).
   These are rounded, illustrative constants for an education tool — not a
   live feed. Pairs where USD is the quote currency are exactly $10/pip.
*/

export const CURRENCY_PAIRS = [
  { pair: "EUR/USD", pipValuePerLot: 10, pipSize: 0.0001 },
  { pair: "GBP/USD", pipValuePerLot: 10, pipSize: 0.0001 },
  { pair: "AUD/USD", pipValuePerLot: 10, pipSize: 0.0001 },
  { pair: "NZD/USD", pipValuePerLot: 10, pipSize: 0.0001 },
  { pair: "USD/JPY", pipValuePerLot: 6.6, pipSize: 0.01 },
  { pair: "USD/CHF", pipValuePerLot: 11.2, pipSize: 0.0001 },
  { pair: "USD/CAD", pipValuePerLot: 7.3, pipSize: 0.0001 },
  { pair: "EUR/GBP", pipValuePerLot: 12.7, pipSize: 0.0001 },
  { pair: "EUR/JPY", pipValuePerLot: 6.6, pipSize: 0.01 },
  { pair: "GBP/JPY", pipValuePerLot: 6.6, pipSize: 0.01 },
];

export const TOOLS_PREVIEW = [
  {
    id: "pip-calculator",
    title: "Pip Calculator",
    icon: "ph:ruler",
    description:
      "Work out what a single pip is worth in USD for your pair and lot size.",
  },
  {
    id: "profit-calculator",
    title: "Profit Calculator",
    icon: "ph:chart-line-up",
    description:
      "Estimate the profit or loss on a trade from entry, exit, and size.",
  },
  {
    id: "market-news",
    title: "Market News",
    icon: "ph:newspaper",
    description:
      "A live headline timeline for the currencies you're learning to read.",
    to: "/markets",
  },
  {
    id: "economic-calendar",
    title: "Economic Calendar",
    icon: "ph:calendar-check",
    description:
      "See upcoming high-impact events with plain-language explanations.",
    to: "/markets",
  },
];
