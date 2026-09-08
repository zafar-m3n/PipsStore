/* Glossary terms — used on Home (teaser) and Academy (full, filterable). */

export const GLOSSARY_CATEGORIES = [
  "Forex Basics",
  "Technical Analysis",
  "Fundamental Analysis",
  "Risk Management",
  "Market Terms",
];

export const GLOSSARY_TERMS = [
  {
    term: "Pip",
    category: "Forex Basics",
    definition:
      "The smallest standard price move in a currency pair, usually the fourth decimal place (0.0001).",
    example:
      "If EUR/USD moves from 1.1050 to 1.1051, that's a one-pip move.",
    whyItMatters:
      "Pips are how you measure profit, loss, and risk. Every calculator on this site works in pips.",
    related: ["Spread", "Lot", "Pip Value"],
  },
  {
    term: "Leverage",
    category: "Forex Basics",
    definition:
      "Borrowed buying power from a broker that lets you control a larger position than your deposit.",
    example:
      "With 30:1 leverage, $1,000 can control a $30,000 position.",
    whyItMatters:
      "Leverage multiplies both gains and losses. It's the fastest way for beginners to blow an account.",
    related: ["Margin", "Lot", "Risk Management"],
  },
  {
    term: "Margin",
    category: "Forex Basics",
    definition:
      "The portion of your account set aside as a good-faith deposit to open a leveraged trade.",
    example:
      "A trade needing 3.3% margin ties up $330 of a $10,000 account.",
    whyItMatters:
      "Run out of free margin and the broker closes your trades automatically (a margin call).",
    related: ["Leverage", "Free Margin", "Margin Call"],
  },
  {
    term: "Spread",
    category: "Forex Basics",
    definition:
      "The difference between the buy (ask) and sell (bid) price of a pair — effectively a transaction cost.",
    example:
      "Buy EUR/USD at 1.1052 while it sells at 1.1051: a one-pip spread.",
    whyItMatters:
      "You start every trade slightly negative by the spread, so it matters most on short-term trades.",
    related: ["Pip", "Liquidity", "Slippage"],
  },
  {
    term: "Lot",
    category: "Forex Basics",
    definition:
      "A standard unit of trade size. One standard lot is 100,000 units; a mini lot is 10,000; a micro lot is 1,000.",
    example:
      "Trading 0.10 lots of GBP/USD means a position of 10,000 units.",
    whyItMatters:
      "Lot size decides how much each pip is worth, which decides how much you risk.",
    related: ["Pip Value", "Position Size", "Leverage"],
  },
  {
    term: "Support",
    category: "Technical Analysis",
    definition:
      "A price area where buying has repeatedly been strong enough to stop or reverse a fall.",
    example:
      "EUR/USD bounces near 1.0800 three times in a month — that's support.",
    whyItMatters:
      "Support gives you a reference for entries, stop placement, and where a bias would be wrong.",
    related: ["Resistance", "Breakout", "Trend"],
  },
  {
    term: "Resistance",
    category: "Technical Analysis",
    definition:
      "A price area where selling has repeatedly been strong enough to stop or reverse a rise.",
    example:
      "GBP/USD stalls near 1.2800 on several attempts — that's resistance.",
    whyItMatters:
      "Knowing where price has struggled before helps you set realistic targets.",
    related: ["Support", "Breakout", "Trend"],
  },
  {
    term: "Trend",
    category: "Technical Analysis",
    definition:
      "The general direction of price over time: an uptrend makes higher highs and higher lows; a downtrend does the opposite.",
    example:
      "A pair rising from 1.05 to 1.12 with shallow pullbacks is in an uptrend.",
    whyItMatters:
      "Trading with the trend puts probability on your side and keeps losers smaller.",
    related: ["Range", "Pullback", "Market Structure"],
  },
  {
    term: "Candlestick",
    category: "Technical Analysis",
    definition:
      "A chart mark showing the open, high, low, and close for one time period. A body plus two wicks.",
    example:
      "A long green body with tiny wicks means buyers controlled the whole session.",
    whyItMatters:
      "Candles are the raw language of price. Patterns and structure are all built from them.",
    related: ["Doji", "Engulfing", "Timeframe"],
  },
  {
    term: "RSI",
    category: "Technical Analysis",
    definition:
      "Relative Strength Index — an oscillator from 0 to 100 that measures the speed of recent price change.",
    example:
      "RSI above 70 is often called overbought; below 30, oversold.",
    whyItMatters:
      "It hints at momentum shifts, but it's context, not a buy/sell button.",
    related: ["MACD", "Momentum", "Divergence"],
  },
  {
    term: "Interest Rate",
    category: "Fundamental Analysis",
    definition:
      "The rate a central bank charges banks to borrow. It anchors the return on holding that currency.",
    example:
      "If a central bank raises rates, its currency often strengthens as yield-seeking money flows in.",
    whyItMatters:
      "Rate expectations are the single biggest long-term driver of currency values.",
    related: ["CPI", "Central Bank", "Rate Differential"],
  },
  {
    term: "CPI",
    category: "Fundamental Analysis",
    definition:
      "Consumer Price Index — a monthly measure of how much prices for everyday goods and services have changed.",
    example:
      "A CPI reading above forecast can push a central bank toward higher rates.",
    whyItMatters:
      "Inflation data moves rate expectations, and rate expectations move currencies.",
    related: ["Interest Rate", "Inflation", "Economic Calendar"],
  },
  {
    term: "Non-Farm Payrolls",
    category: "Fundamental Analysis",
    definition:
      "A monthly US report on jobs added outside farming, government, and a few other sectors.",
    example:
      "A far-above-forecast NFP can spike USD volatility within seconds.",
    whyItMatters:
      "It's one of the highest-impact releases — many beginners simply stand aside for it.",
    related: ["CPI", "Economic Calendar", "Volatility"],
  },
  {
    term: "Risk-to-Reward",
    category: "Risk Management",
    definition:
      "The ratio between how much you stand to lose and how much you stand to gain on a trade.",
    example:
      "Risking 20 pips to make 60 pips is a 1:3 risk-to-reward.",
    whyItMatters:
      "With a good ratio you can be right less than half the time and still come out ahead.",
    related: ["Stop Loss", "Take Profit", "Expectancy"],
  },
  {
    term: "Stop Loss",
    category: "Risk Management",
    definition:
      "A pre-set order that closes a losing trade at a defined price so the loss can't keep growing.",
    example:
      "Long EUR/USD at 1.1000 with a stop at 1.0975 caps the loss at 25 pips.",
    whyItMatters:
      "A stop turns an unknown risk into a known, sized one. Trading without it is gambling.",
    related: ["Risk-to-Reward", "Position Size", "Drawdown"],
  },
  {
    term: "Drawdown",
    category: "Risk Management",
    definition:
      "The drop from an account's peak balance to its lowest point before a new peak is made.",
    example:
      "An account falling from $10,000 to $8,500 has a 15% drawdown.",
    whyItMatters:
      "Recovering from a deep drawdown takes an outsized gain, so keeping it shallow is survival.",
    related: ["Risk of Ruin", "Position Size", "Expectancy"],
  },
  {
    term: "Liquidity",
    category: "Market Terms",
    definition:
      "How easily an asset can be bought or sold without moving its price much.",
    example:
      "EUR/USD is highly liquid; an exotic pair like USD/TRY is not.",
    whyItMatters:
      "Low liquidity means wider spreads and more slippage, especially around news.",
    related: ["Spread", "Slippage", "Session"],
  },
  {
    term: "Volatility",
    category: "Market Terms",
    definition:
      "How much and how quickly a price moves over a given period.",
    example:
      "During a rate decision, a pair might move its usual daily range in minutes.",
    whyItMatters:
      "Higher volatility means bigger opportunities and bigger risks — position size should adjust.",
    related: ["Liquidity", "ATR", "Economic Calendar"],
  },
];

/* Chips + one sample card for the Home glossary teaser. */
export const GLOSSARY_TEASER_CHIPS = [
  "Pip",
  "Leverage",
  "Margin",
  "Spread",
  "Support",
  "Resistance",
  "CPI",
  "Interest Rate",
];

export const GLOSSARY_SAMPLE_TERM = GLOSSARY_TERMS[0];
