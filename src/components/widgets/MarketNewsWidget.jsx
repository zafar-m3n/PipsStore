import { memo } from "react";
import TradingViewEmbed from "@/components/widgets/TradingViewEmbed.jsx";

const SRC = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
const CONFIG = {
  displayMode: "adaptive",
  feedMode: "all_symbols",
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: "100%",
};
const COPYRIGHT = { href: "https://www.tradingview.com/news/top-providers/tradingview/", label: "Top stories" };

function MarketNewsWidget() {
  return <TradingViewEmbed src={SRC} config={CONFIG} copyright={COPYRIGHT} />;
}

export default memo(MarketNewsWidget);
