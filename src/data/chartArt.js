/* ============================================================
   Line-art definitions for <DrawnChart />.
   Every visual on the site is vector — no photography anywhere.

   Element descriptors (see DrawnChart.renderElement):
     { type: "polyline", points }
     { type: "path", d }
     { type: "line", x1,y1,x2,y2 }
     { type: "hline", y, x1, x2, dashArray }        // dashed level line, fades in
     { type: "band", x,y,w,h, fill }                // highlighted zone, fades in
     { type: "candle", x, wickTop,wickBot, bodyTop,bodyBot, w, bear }
     { type: "arrow", x1,y1,x2,y2 }                 // fades in after strokes
     { type: "note", x,y, text, size, anchor }      // Shantell Sans, fades in
   Optional per element: stroke, width, fill
   ============================================================ */

/* ---------------- Homepage hero ---------------- */
export const HERO_ART = {
  viewBox: "0 0 360 320",
  ariaLabel:
    "Hand-drawn rising price line with candlesticks and a trend arrow",
  elements: [
    { type: "hline", y: 286, x1: 18, x2: 344, dashArray: "2 7", width: 1.2 },
    {
      type: "polyline",
      width: 2.6,
      points:
        "20,244 58,252 96,214 134,228 172,178 210,196 248,146 288,156 340,92",
    },
    { type: "candle", x: 70, wickTop: 224, wickBot: 266, bodyTop: 238, bodyBot: 258, w: 16, bear: true, width: 2 },
    { type: "candle", x: 150, wickTop: 196, wickBot: 240, bodyTop: 206, bodyBot: 232, w: 16, width: 2 },
    { type: "candle", x: 232, wickTop: 158, wickBot: 206, bodyTop: 170, bodyBot: 198, w: 16, bear: true, width: 2 },
    { type: "candle", x: 312, wickTop: 108, wickBot: 166, bodyTop: 120, bodyBot: 150, w: 16, width: 2 },
    { type: "band", x: 20, y: 214, w: 324, h: 22 },
    { type: "arrow", x1: 42, y1: 252, x2: 330, y2: 104, width: 2.4 },
    { type: "note", x: 24, y: 40, text: "higher highs, higher lows", size: 14 },
    { type: "note", x: 24, y: 208, text: "support", size: 13 },
  ],
};

/* ---------------- Analysis: live chart dashboard ---------------- */
export const DASHBOARD_ART = {
  viewBox: "0 0 480 260",
  ariaLabel:
    "Hand-drawn price line with a highlighted support zone, a resistance line, and a breakout arrow",
  elements: [
    {
      type: "polyline",
      width: 2.6,
      points:
        "20,182 60,150 100,170 140,120 180,142 220,96 260,122 300,80 340,112 380,70 420,96 462,54",
    },
    { type: "hline", y: 68, x1: 20, x2: 462, dashArray: "7 6" },
    { type: "band", x: 20, y: 150, w: 442, h: 26 },
    { type: "hline", y: 163, x1: 20, x2: 462, dashArray: "7 6" },
    { type: "arrow", x1: 300, y1: 150, x2: 344, y2: 98, width: 2.4 },
    { type: "note", x: 24, y: 144, text: "buyers defend this zone", size: 14 },
    { type: "note", x: 458, y: 56, text: "sellers cap it here", size: 14, anchor: "end" },
  ],
};

/* ---------------- Candlestick pattern cards ---------------- */
const CANDLE_VB = "0 0 320 180";

export const CANDLE_ART = {
  doji: {
    viewBox: CANDLE_VB,
    ariaLabel: "Doji candlestick — open and close almost equal",
    elements: [
      { type: "candle", x: 96, wickTop: 72, wickBot: 122, bodyTop: 86, bodyBot: 110, w: 20, bear: true, width: 1.8 },
      { type: "candle", x: 160, wickTop: 34, wickBot: 152, bodyTop: 90, bodyBot: 95, w: 30, width: 2.8 },
      { type: "candle", x: 224, wickTop: 66, wickBot: 118, bodyTop: 78, bodyBot: 104, w: 20, width: 1.8 },
      { type: "note", x: 160, y: 24, text: "open ≈ close", size: 12, anchor: "middle" },
    ],
  },
  engulfing: {
    viewBox: CANDLE_VB,
    ariaLabel: "Bullish engulfing — a large candle body covers the previous one",
    elements: [
      { type: "candle", x: 92, wickTop: 78, wickBot: 128, bodyTop: 92, bodyBot: 118, w: 20, bear: true, width: 1.8 },
      { type: "candle", x: 150, wickTop: 70, wickBot: 122, bodyTop: 84, bodyBot: 110, w: 22, bear: true, width: 2 },
      { type: "candle", x: 204, wickTop: 46, wickBot: 142, bodyTop: 70, bodyBot: 126, w: 34, width: 2.8 },
      { type: "note", x: 204, y: 36, text: "engulfs the last one", size: 12, anchor: "middle" },
    ],
  },
  hammer: {
    viewBox: CANDLE_VB,
    ariaLabel: "Hammer — small body near the top with a long lower wick",
    elements: [
      { type: "candle", x: 92, wickTop: 44, wickBot: 92, bodyTop: 52, bodyBot: 84, w: 20, bear: true, width: 1.8 },
      { type: "candle", x: 132, wickTop: 56, wickBot: 108, bodyTop: 64, bodyBot: 100, w: 20, bear: true, width: 1.8 },
      { type: "candle", x: 186, wickTop: 52, wickBot: 152, bodyTop: 54, bodyBot: 72, w: 28, width: 2.8 },
      { type: "note", x: 214, y: 128, text: "long lower wick", size: 11 },
    ],
  },
  "shooting-star": {
    viewBox: CANDLE_VB,
    ariaLabel: "Shooting star — small body near the bottom with a long upper wick",
    elements: [
      { type: "candle", x: 92, wickTop: 96, wickBot: 140, bodyTop: 104, bodyBot: 132, w: 20, width: 1.8 },
      { type: "candle", x: 132, wickTop: 74, wickBot: 122, bodyTop: 82, bodyBot: 114, w: 20, width: 1.8 },
      { type: "candle", x: 186, wickTop: 28, wickBot: 128, bodyTop: 110, bodyBot: 128, w: 28, bear: true, width: 2.8 },
      { type: "note", x: 118, y: 44, text: "long upper wick", size: 11 },
    ],
  },
};

/* ---------------- Technical indicator cards ---------------- */
const IND_VB = "0 0 320 180";

export const INDICATOR_ART = {
  "moving-average": {
    viewBox: IND_VB,
    ariaLabel: "Price line riding above a rising moving-average line",
    elements: [
      {
        type: "polyline",
        width: 2,
        points: "20,132 52,112 82,122 112,90 142,102 172,70 202,86 232,54 262,68 300,42",
      },
      {
        type: "polyline",
        width: 2.8,
        points: "20,142 60,130 100,118 140,106 180,92 220,76 260,60 300,48",
      },
      { type: "note", x: 26, y: 26, text: "price above rising average", size: 11 },
    ],
  },
  rsi: {
    viewBox: IND_VB,
    ariaLabel: "RSI oscillator between overbought and oversold lines",
    elements: [
      { type: "path", d: "M20 32 h280 v116 h-280 Z", width: 1.6 },
      {
        type: "polyline",
        width: 2.6,
        points: "26,120 56,66 86,58 120,96 150,52 186,44 220,82 254,60 296,102",
      },
      { type: "hline", y: 50, x1: 20, x2: 300 },
      { type: "hline", y: 128, x1: 20, x2: 300 },
      { type: "note", x: 26, y: 44, text: "overbought", size: 10 },
      { type: "note", x: 26, y: 146, text: "oversold", size: 10 },
    ],
  },
  macd: {
    viewBox: IND_VB,
    ariaLabel: "MACD line crossing its signal line above a histogram",
    elements: [
      { type: "line", x1: 54, y1: 100, x2: 54, y2: 88, width: 5 },
      { type: "line", x1: 92, y1: 100, x2: 92, y2: 78, width: 5 },
      { type: "line", x1: 130, y1: 100, x2: 130, y2: 84, width: 5 },
      { type: "line", x1: 168, y1: 100, x2: 168, y2: 108, width: 5 },
      { type: "line", x1: 206, y1: 100, x2: 206, y2: 116, width: 5 },
      { type: "line", x1: 244, y1: 100, x2: 244, y2: 110, width: 5 },
      {
        type: "polyline",
        width: 2.6,
        points: "20,128 70,108 120,78 170,70 220,96 270,116 300,120",
      },
      {
        type: "polyline",
        width: 2,
        points: "20,120 70,116 120,100 170,86 220,88 270,100 300,110",
      },
      { type: "hline", y: 100, x1: 20, x2: 300 },
      { type: "note", x: 160, y: 150, text: "lines cross", size: 11, anchor: "middle" },
    ],
  },
  bollinger: {
    viewBox: IND_VB,
    ariaLabel: "Bollinger bands squeezing then widening around price",
    elements: [
      {
        type: "polyline",
        width: 2,
        points: "20,70 80,66 140,74 180,50 240,30 300,26",
      },
      {
        type: "polyline",
        width: 2,
        points: "20,120 80,124 140,116 180,132 240,152 300,156",
      },
      {
        type: "polyline",
        width: 2.8,
        points: "20,96 60,92 100,98 140,95 180,86 220,68 260,62 300,50",
      },
      { type: "band", x: 122, y: 74, w: 40, h: 44 },
      { type: "note", x: 142, y: 66, text: "the squeeze", size: 11, anchor: "middle" },
    ],
  },
};

/* ---------------- Chart pattern cards ---------------- */
const PAT_VB = "0 0 320 180";

export const PATTERN_ART = {
  "double-top": {
    viewBox: PAT_VB,
    ariaLabel: "Double top — two peaks at a similar high, then a neckline break",
    elements: [
      {
        type: "polyline",
        width: 2.6,
        points: "20,140 60,110 100,50 140,96 180,50 230,110 300,150",
      },
      { type: "hline", y: 96, x1: 60, x2: 300 },
      { type: "arrow", x1: 258, y1: 120, x2: 296, y2: 156 },
      { type: "note", x: 100, y: 36, text: "two tops", size: 11, anchor: "middle" },
    ],
  },
  "double-bottom": {
    viewBox: PAT_VB,
    ariaLabel: "Double bottom — two dips at a similar low, then a neckline break",
    elements: [
      {
        type: "polyline",
        width: 2.6,
        points: "20,40 60,80 100,140 140,96 180,140 230,80 300,44",
      },
      { type: "hline", y: 96, x1: 60, x2: 300 },
      { type: "arrow", x1: 258, y1: 70, x2: 296, y2: 34 },
      { type: "note", x: 100, y: 164, text: "two bottoms", size: 11, anchor: "middle" },
    ],
  },
  "head-shoulders": {
    viewBox: PAT_VB,
    ariaLabel: "Head and shoulders — a higher middle peak between two lower ones",
    elements: [
      {
        type: "polyline",
        width: 2.6,
        points: "20,150 55,120 72,74 110,114 160,32 210,114 250,76 286,120 304,146",
      },
      { type: "hline", y: 114, x1: 55, x2: 290 },
      { type: "arrow", x1: 268, y1: 126, x2: 300, y2: 158 },
      { type: "note", x: 160, y: 24, text: "head", size: 11, anchor: "middle" },
    ],
  },
  triangle: {
    viewBox: PAT_VB,
    ariaLabel: "Symmetrical triangle — price coils into a narrowing range, then breaks",
    elements: [
      { type: "line", x1: 28, y1: 40, x2: 300, y2: 96, width: 2 },
      { type: "line", x1: 28, y1: 150, x2: 300, y2: 96, width: 2 },
      {
        type: "polyline",
        width: 2.6,
        points: "30,60 70,138 110,74 150,126 190,86 230,114 270,96 300,96",
      },
      { type: "arrow", x1: 276, y1: 96, x2: 312, y2: 66 },
      { type: "note", x: 150, y: 168, text: "coils, then breaks", size: 11, anchor: "middle" },
    ],
  },
};
