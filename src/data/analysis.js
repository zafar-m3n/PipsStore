/* Analysis page content.
   Every chart visual is a line-art definition consumed by <DrawnChart />;
   the shape data lives in src/data/chartArt.js and is attached here as `art`.
*/

import {
  DASHBOARD_ART,
  CANDLE_ART,
  INDICATOR_ART,
  PATTERN_ART,
} from "@/data/chartArt.js";

export const CHART_FUNDAMENTALS = [
  {
    title: "Candlesticks",
    icon: "ph:chart-candlestick",
    description:
      "Each candle shows the open, high, low, and close for a period. The body is the range between open and close; the wicks are the extremes.",
  },
  {
    title: "Trends",
    icon: "ph:trend-up",
    description:
      "A series of higher highs and higher lows is an uptrend; lower highs and lower lows is a downtrend. Sideways is a range.",
  },
  {
    title: "Support & Resistance",
    icon: "ph:arrows-in-line-horizontal",
    description:
      "Price areas where buyers or sellers have stepped in repeatedly. They act as reference points, not exact lines.",
  },
  {
    title: "Timeframes",
    icon: "ph:clock-countdown",
    description:
      "The same market looks different on a 5-minute and a daily chart. Higher timeframes carry more weight.",
  },
];

export const DASHBOARD = {
  art: DASHBOARD_ART,
  ticker: {
    pair: "EUR/USD",
    price: "1.0934",
    change: "+0.0042",
    changePct: "+0.39%",
    direction: "up",
  },
  timeframes: ["15m", "1H", "4H", "1D", "1W"],
  activeTimeframe: "4H",
  rsi: 58,
  keyLevels: [
    { label: "Resistance", value: "1.1020", kind: "resistance" },
    { label: "Resistance", value: "1.0975", kind: "resistance" },
    { label: "Current", value: "1.0934", kind: "current" },
    { label: "Support", value: "1.0880", kind: "support" },
    { label: "Support", value: "1.0820", kind: "support" },
  ],
  readingNote:
    "Price is mid-range and RSI is neutral, so there's no edge here yet. The plan is to watch how the next 4H candles react at 1.0975 or 1.0880 — the edges are where information shows up.",
};

export const CANDLESTICK_PATTERNS = [
  {
    id: "doji",
    name: "Doji",
    art: CANDLE_ART.doji,
    signal: "Indecision",
    signalKind: "neutral",
    description:
      "Open and close are almost equal, leaving a tiny body with wicks on both sides. Neither side won the session.",
  },
  {
    id: "engulfing",
    name: "Engulfing Candle",
    art: CANDLE_ART.engulfing,
    signal: "Reversal",
    signalKind: "reversal",
    description:
      "A candle whose body completely covers the previous candle's body. A bullish engulfing follows a downmove; bearish follows an upmove.",
  },
  {
    id: "hammer",
    name: "Hammer",
    art: CANDLE_ART.hammer,
    signal: "Bullish",
    signalKind: "bullish",
    description:
      "A small body near the top with a long lower wick. Sellers pushed price down but buyers dragged it back before the close.",
  },
  {
    id: "shooting-star",
    name: "Shooting Star",
    art: CANDLE_ART["shooting-star"],
    signal: "Bearish",
    signalKind: "bearish",
    description:
      "A small body near the bottom with a long upper wick. Buyers pushed up but sellers took control by the close — often near a high.",
  },
];

export const TECHNICAL_INDICATORS = [
  {
    id: "moving-average",
    name: "Moving Average",
    art: INDICATOR_ART["moving-average"],
    howToUse:
      "A line of the average price over N periods. Price above a rising average = uptrend context; use it as a trend filter, not a signal on its own.",
  },
  {
    id: "rsi",
    name: "RSI",
    art: INDICATOR_ART.rsi,
    howToUse:
      "Momentum oscillator from 0–100. Above 70 is 'overbought', below 30 'oversold' — but in a strong trend it can stay pinned. Watch for divergence with price.",
  },
  {
    id: "macd",
    name: "MACD",
    art: INDICATOR_ART.macd,
    howToUse:
      "Two lines plus a histogram showing momentum shifts. A line cross or the histogram flipping through zero is the common cue — confirm with structure.",
  },
  {
    id: "bollinger",
    name: "Bollinger Bands",
    art: INDICATOR_ART.bollinger,
    howToUse:
      "A moving average with bands set a couple of standard deviations away. Bands squeeze in quiet markets and widen when volatility picks up.",
  },
];

export const CHART_PATTERNS = [
  {
    id: "double-top",
    name: "Double Top",
    art: PATTERN_ART["double-top"],
    signal: "Bearish",
    signalKind: "bearish",
    description:
      "Two pushes to a similar high with a dip between them. A break below that dip (the neckline) is the trigger many traders watch.",
  },
  {
    id: "double-bottom",
    name: "Double Bottom",
    art: PATTERN_ART["double-bottom"],
    signal: "Bullish",
    signalKind: "bullish",
    description:
      "The mirror of a double top: two dips to a similar low, then a break above the middle peak points higher.",
  },
  {
    id: "head-shoulders",
    name: "Head & Shoulders",
    art: PATTERN_ART["head-shoulders"],
    signal: "Bearish",
    signalKind: "bearish",
    description:
      "Three peaks — a higher middle one (the head) between two lower ones (shoulders). A break of the neckline under them is the classic signal.",
  },
  {
    id: "triangle",
    name: "Triangle",
    art: PATTERN_ART.triangle,
    signal: "Continuation",
    signalKind: "neutral",
    description:
      "Price coils into a narrowing range as highs fall and lows rise. The move usually comes on the break of one of the trendlines.",
  },
];

export const CHART_BREAKDOWNS = [
  {
    id: "support-bounce",
    title: "A support bounce",
    scenario:
      "EUR/USD has fallen for three days into 1.0820, an area that stopped two previous declines. A 4H candle prints a long lower wick and closes back above 1.0850.",
    analysis:
      "The level held again and the wick shows sellers couldn't keep price down. RSI had dipped near 30 and turned up. Nothing here guarantees a reversal, but the risk is now well-defined: just below 1.0820.",
    keyLesson:
      "A reaction at a known level plus a clear invalidation point is worth more than a prediction. If 1.0820 breaks, the idea is simply wrong — and the loss is small.",
  },
  {
    id: "resistance-rejection",
    title: "A resistance rejection",
    scenario:
      "GBP/USD rallies into 1.2800, a ceiling from last month. Price stalls, then a bearish engulfing candle forms on the 1H chart right at the level.",
    analysis:
      "Buyers ran out of room at a spot where sellers showed up before. The engulfing candle is the visible hand-off. A trader watching this would note lower-timeframe structure turning down to line up with the higher-timeframe level.",
    keyLesson:
      "Confluence — a pattern happening exactly where a level sits — is more convincing than either signal alone. Still, size the position so a failed rejection costs little.",
  },
  {
    id: "trendline-breakout",
    title: "A trendline breakout",
    scenario:
      "USD/JPY has been grinding lower for two weeks under a falling trendline. Price closes decisively above the line on above-average range, then pulls back to retest it.",
    analysis:
      "The break says the down-pressure has eased; the retest is the market checking whether old resistance now acts as support. Holding the retest is the tell. A close back below the line would negate the break.",
    keyLesson:
      "Breakouts are more reliable after a retest holds. Waiting for that confirmation costs some upside but filters out a lot of false breaks.",
  },
];
