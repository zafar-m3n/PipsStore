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
    trendLineColor: "rgba(182, 182, 190, 1)",
    underLineColor: "rgba(182, 182, 190, 0.08)",
    underLineBottomColor: "rgba(182, 182, 190, 0.08)",
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
