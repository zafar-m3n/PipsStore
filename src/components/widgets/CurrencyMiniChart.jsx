import TradingViewEmbed from "@/components/widgets/TradingViewEmbed.jsx";

const SRC = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
const MIN_HEIGHT = { minHeight: "220px" };

function CurrencyMiniChart({ symbol = "FX:EURUSD" }) {
  const config = {
    symbol,
    width: "100%",
    height: 220,
    locale: "en",
    dateRange: "12M",
    colorTheme: "dark",
    isTransparent: true,
    autosize: true,
    largeChartUrl: "",
    trendLineColor: "rgba(166, 166, 174, 1)",
    underLineColor: "rgba(166, 166, 174, 0.08)",
    underLineBottomColor: "rgba(166, 166, 174, 0.08)",
  };

  return (
    <TradingViewEmbed
      src={SRC}
      config={config}
      className="pointer-events-none mx-auto w-full overflow-hidden rounded-lg"
      style={MIN_HEIGHT}
    />
  );
}

export default CurrencyMiniChart;
