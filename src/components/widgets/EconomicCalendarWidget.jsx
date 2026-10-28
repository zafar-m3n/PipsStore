import { memo } from "react";
import TradingViewEmbed from "@/components/widgets/TradingViewEmbed.jsx";

const SRC = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
const CONFIG = {
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
  importanceFilter: "-1,0,1",
  width: "100%",
  height: "100%",
};
const COPYRIGHT = { href: "https://www.tradingview.com/economic-calendar/", label: "Economic Calendar" };

function EconomicCalendarWidget() {
  return <TradingViewEmbed src={SRC} config={CONFIG} copyright={COPYRIGHT} />;
}

export default memo(EconomicCalendarWidget);
