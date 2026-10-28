import { useEffect, useRef } from "react";

/* TradingView embed: the standard container markup plus the widget script,
   which reads its JSON config from its own body. The script is appended a tick
   late so a mount that is torn down at once (StrictMode) never starts one. */
function TradingViewEmbed({ src, config, copyright, className = "", style }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  const json = JSON.stringify(config);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = json;
    const timer = setTimeout(() => container.appendChild(script));

    return () => {
      clearTimeout(timer);
      script.remove();
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, [src, json]);

  return (
    <div ref={containerRef} className={["tradingview-widget-container", className].join(" ")} style={style}>
      <div ref={widgetRef} className="tradingview-widget-container__widget" />
      {copyright && (
        <div className="tradingview-widget-copyright">
          <a href={copyright.href} rel="noopener nofollow" target="_blank">
            <span className="blue-text">{copyright.label}</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      )}
    </div>
  );
}

export default TradingViewEmbed;
