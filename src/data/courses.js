/* Academy course catalog. Grouped by level via the `level` field. */

export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const COURSES = [
  // ---------------- Beginner ----------------
  {
    id: "what-is-forex",
    title: "What Is Forex, Really?",
    level: "Beginner",
    icon: "ph:globe-hemisphere-west",
    time: "45 min",
    lessons: 6,
    description:
      "Currencies, pairs, and why exchange rates move. The mental model everything else builds on.",
  },
  {
    id: "pips-lots-leverage",
    title: "Pips, Lots & Leverage",
    level: "Beginner",
    icon: "ph:ruler",
    time: "50 min",
    lessons: 7,
    description:
      "How trade size is measured, what a pip is worth, and why leverage cuts both ways.",
  },
  {
    id: "risk-management-basics",
    title: "Risk Management Basics",
    level: "Beginner",
    icon: "ph:shield-check",
    time: "1 hr",
    lessons: 8,
    description:
      "The 1% rule, stop-loss placement, and position sizing — taught before any strategy.",
  },
  {
    id: "reading-a-candle",
    title: "Reading a Candlestick",
    level: "Beginner",
    icon: "ph:chart-candlestick",
    time: "40 min",
    lessons: 5,
    description:
      "Open, high, low, close — what a single candle tells you and what it doesn't.",
  },
  {
    id: "your-first-trading-plan",
    title: "Your First Trading Plan",
    level: "Beginner",
    icon: "ph:clipboard-text",
    time: "55 min",
    lessons: 6,
    description:
      "Turn what you've learned into written rules for entries, exits, and daily routine.",
  },

  // ---------------- Intermediate ----------------
  {
    id: "trends-and-structure",
    title: "Trends & Market Structure",
    level: "Intermediate",
    icon: "ph:trend-up",
    time: "1 hr 10 min",
    lessons: 9,
    description:
      "Higher highs, lower lows, ranges, and how to tell which regime the market is in.",
  },
  {
    id: "support-resistance-deep",
    title: "Support & Resistance in Depth",
    level: "Intermediate",
    icon: "ph:arrows-in-line-horizontal",
    time: "1 hr",
    lessons: 8,
    description:
      "Drawing levels that matter, spotting flips, and avoiding the lines everyone else ignores.",
  },
  {
    id: "candlestick-patterns-course",
    title: "Candlestick Patterns That Count",
    level: "Intermediate",
    icon: "ph:chart-bar",
    time: "1 hr 20 min",
    lessons: 10,
    description:
      "Doji, engulfing, hammer, shooting star — in context, not as magic signals.",
  },
  {
    id: "reading-the-calendar",
    title: "Reading the Economic Calendar",
    level: "Intermediate",
    icon: "ph:calendar-check",
    time: "50 min",
    lessons: 6,
    description:
      "Forecast vs. actual, impact levels, and how to stay out of trouble around releases.",
  },
  {
    id: "trade-journaling",
    title: "Trade Journaling & Review",
    level: "Intermediate",
    icon: "ph:notebook",
    time: "45 min",
    lessons: 5,
    description:
      "Build a journal, tag your mistakes, and turn a losing month into a lesson.",
  },

  // ---------------- Advanced ----------------
  {
    id: "confluence-and-context",
    title: "Confluence & Context",
    level: "Advanced",
    icon: "ph:intersect",
    time: "1 hr 30 min",
    lessons: 11,
    description:
      "Stacking level, trend, and timeframe agreement so one signal isn't carrying the whole trade.",
  },
  {
    id: "risk-of-ruin",
    title: "Risk of Ruin & Expectancy",
    level: "Advanced",
    icon: "ph:function",
    time: "1 hr",
    lessons: 7,
    description:
      "The math behind win rate, R multiples, and why drawdowns are survivable when sized right.",
  },
  {
    id: "macro-for-traders",
    title: "Macro for Traders",
    level: "Advanced",
    icon: "ph:bank",
    time: "1 hr 25 min",
    lessons: 9,
    description:
      "Rate differentials, policy cycles, and risk sentiment — how the big picture frames a pair.",
  },
  {
    id: "trading-psychology",
    title: "Trading Psychology Under Pressure",
    level: "Advanced",
    icon: "ph:brain",
    time: "1 hr",
    lessons: 8,
    description:
      "Tilt, revenge trades, and hesitation — practical routines to keep decisions clean.",
  },
  {
    id: "building-a-system",
    title: "Building a Rule-Based System",
    level: "Advanced",
    icon: "ph:blueprint",
    time: "1 hr 40 min",
    lessons: 12,
    description:
      "Define, test, and document a complete system with fixed risk and clear invalidation.",
  },
];
