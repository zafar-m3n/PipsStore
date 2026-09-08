/* Markets page content: weekly outlook, news, watchlist, calendar. */

export const WEEKLY_OUTLOOK = {
  headline: "A rate-decision week with inflation data either side of it",
  summary:
    "Two central banks meet this week and both are expected to hold, so the focus is on the tone of the statements rather than the decision itself. Inflation prints from the US and euro area land midweek and could shift rate-cut expectations for later in the year. Expect quieter ranges early, then sharper moves Wednesday onward.",
  events: [
    "Tue — Euro area flash CPI (year-on-year)",
    "Wed — US CPI and core CPI",
    "Wed — Central bank rate decision + press conference",
    "Thu — US weekly jobless claims",
    "Fri — UK monthly GDP",
  ],
  currencies: ["USD", "EUR", "GBP", "JPY"],
  beginnerNote:
    "You don't need to trade any of this. Watching how price behaves around a known event — before, during, and after — is one of the best free lessons available.",
};

export const MARKET_NEWS = [
  {
    id: "cpi-cooler",
    category: "Inflation",
    date: "2026-09-03",
    title: "Headline inflation cools more than expected",
    summary:
      "The latest CPI reading came in below forecast, with slower price growth in energy and goods. Markets nudged up bets on a rate cut later this year.",
    beginnerNote:
      "Lower inflation can mean lower interest rates ahead, which often weakens a currency. 'Below forecast' is what moved the market, not the number itself.",
  },
  {
    id: "central-bank-hold",
    category: "Central Banks",
    date: "2026-09-02",
    title: "Central bank holds rates, keeps door open",
    summary:
      "Policymakers left the benchmark rate unchanged and said future moves depend on incoming data. The currency barely reacted to the decision but moved on the press conference.",
    beginnerNote:
      "A 'hold' is often priced in already. The surprise — and the volatility — usually comes from the language about what's next.",
  },
  {
    id: "jobs-strong",
    category: "Employment",
    date: "2026-08-29",
    title: "Jobs report beats, dampening cut expectations",
    summary:
      "Hiring was stronger than economists predicted and wage growth ticked up. Bond yields rose and the currency firmed as traders pushed rate-cut bets further out.",
    beginnerNote:
      "A strong economy can support a currency because it makes near-term rate cuts less likely.",
  },
  {
    id: "risk-sentiment",
    category: "Risk Sentiment",
    date: "2026-08-27",
    title: "Safe-haven flows lift JPY and USD",
    summary:
      "A wobble in global equities sent money toward currencies seen as defensive. Higher-yielding and commodity-linked currencies underperformed on the day.",
    beginnerNote:
      "'Risk-off' days tend to favour the US dollar and Japanese yen. It's about where money hides, not about one country's data.",
  },
  {
    id: "oil-move",
    category: "Commodities",
    date: "2026-08-25",
    title: "Oil jump supports commodity currencies",
    summary:
      "A supply headline pushed crude prices sharply higher, giving a lift to currencies of major oil-exporting economies.",
    beginnerNote:
      "Some currencies (like CAD and NOK) often move with the price of the commodities their countries export.",
  },
  {
    id: "gdp-soft",
    category: "Growth",
    date: "2026-08-22",
    title: "Quarterly GDP revised lower",
    summary:
      "A downward revision to growth figures added to the case for easier policy. The currency slipped modestly against most major peers.",
    beginnerNote:
      "Weaker growth can mean rate cuts sooner, which tends to weigh on a currency over time.",
  },
];

export const CURRENCY_WATCHLIST = [
  {
    pair: "EUR/USD",
    bias: "Neutral",
    keyLevel: "1.0850 support / 1.1020 resistance",
    note: "Range-bound ahead of CPI. A close outside the range would be the first real clue.",
  },
  {
    pair: "GBP/USD",
    bias: "Bullish",
    keyLevel: "Holding above 1.2650",
    note: "Higher lows over three weeks. Bias stays constructive while that level holds.",
  },
  {
    pair: "USD/JPY",
    bias: "Bearish",
    keyLevel: "Rejected at 148.00",
    note: "Struggling at prior resistance. Watching for lower highs to confirm the turn.",
  },
  {
    pair: "AUD/USD",
    bias: "Neutral",
    keyLevel: "0.6580 pivot",
    note: "Following risk sentiment and metals prices more than domestic data this week.",
  },
];

export const CALENDAR_EXPLAINERS = [
  {
    title: "What it is",
    icon: "ph:calendar-dots",
    description:
      "A schedule of upcoming economic releases and central-bank events, with the time and expected impact of each.",
  },
  {
    title: "Why it matters",
    icon: "ph:target",
    description:
      "Currencies can move fast around these releases. Even if you don't trade them, they explain a lot of the day's price action.",
  },
  {
    title: "Forecast vs. actual",
    icon: "ph:scales",
    description:
      "Markets price in the forecast ahead of time. The reaction usually comes from the gap between forecast and the actual number.",
  },
  {
    title: "High-impact events",
    icon: "ph:warning-octagon",
    description:
      "Rate decisions, CPI, and jobs reports are the big ones. Many beginners simply avoid trading in the minutes around them.",
  },
];

export const ECONOMIC_CALENDAR = [
  {
    time: "08:30",
    currency: "EUR",
    event: "Flash CPI (YoY)",
    impact: "High",
    previous: "2.4%",
    forecast: "2.3%",
    actual: "2.2%",
    explanation:
      "Euro-area inflation came in a touch below forecast. Softer inflation can pull forward rate-cut expectations, which tends to weigh on the euro.",
  },
  {
    time: "10:00",
    currency: "GBP",
    event: "BOE Monetary Policy Report Hearings",
    impact: "Medium",
    previous: "—",
    forecast: "—",
    actual: "—",
    explanation:
      "Officials testify to lawmakers about the latest policy decision. No number here — traders listen for hints about the path of rates.",
  },
  {
    time: "12:30",
    currency: "USD",
    event: "Core CPI (MoM)",
    impact: "High",
    previous: "0.3%",
    forecast: "0.2%",
    actual: "0.3%",
    explanation:
      "Core CPI strips out food and energy to show the underlying trend. An in-line-to-hot print keeps the central bank cautious about cutting.",
  },
  {
    time: "14:00",
    currency: "CAD",
    event: "BoC Rate Decision",
    impact: "High",
    previous: "3.75%",
    forecast: "3.75%",
    actual: "3.75%",
    explanation:
      "The Bank of Canada held rates as widely expected. With no surprise in the decision, the statement wording drives the reaction.",
  },
  {
    time: "18:00",
    currency: "USD",
    event: "10-Year Bond Auction",
    impact: "Low",
    previous: "4.18%",
    forecast: "—",
    actual: "4.21%",
    explanation:
      "Demand at government debt auctions can nudge yields, and yields influence the dollar — but the effect is usually small and short-lived.",
  },
  {
    time: "23:50",
    currency: "JPY",
    event: "Machinery Orders (MoM)",
    impact: "Medium",
    previous: "-1.2%",
    forecast: "0.8%",
    actual: "2.1%",
    explanation:
      "A forward-looking gauge of business investment. A strong beat is yen-supportive at the margin, though it rarely moves the pair alone.",
  },
];
