import React, { useEffect } from "react";

const MiniChart = ({ symbol = "FX:EURUSD" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: "100%",
      height: 220,
      locale: "en",
      dateRange: "12M",
      colorTheme: "light",
      isTransparent: true,
      autosize: true,
      largeChartUrl: "",
    });

    const container = document.getElementById(`tradingview-mini-chart-${symbol}`);
    container.innerHTML = "";
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container mx-auto w-full rounded-lg shadow-3xl overflow-hidden pointer-events-none"
      style={{ minHeight: "220px" }}
    >
      <div id={`tradingview-mini-chart-${symbol}`} className="tradingview-widget-container__widget h-full"></div>
    </div>
  );
};

export default MiniChart;
