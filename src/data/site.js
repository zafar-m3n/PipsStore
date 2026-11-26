/* Site-wide static content: nav, footer, disclaimer, contact details. */

export const NAV_LINKS = [
  { label: "Academy", to: "/academy" },
  { label: "Markets", to: "/markets" },
  { label: "Analysis", to: "/analysis" },
  { label: "Tools", to: "/tools" },
  { label: "Packages", to: "/packages" },
  { label: "About", to: "/about" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Home", to: "/" },
      { label: "About PipsStore", to: "/about" },
      { label: "Mentoring Packages", to: "/packages" },
      { label: "Market Insights", to: "/markets" },
      { label: "Chart Analysis", to: "/analysis" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "All Courses", to: "/academy" },
      { label: "Beginner Path", to: "/academy" },
      { label: "Glossary", to: "/academy#glossary" },
      { label: "Beginner Roadmap", to: "/#roadmap" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Pip Calculator", to: "/tools#pip-calculator" },
      { label: "Profit Calculator", to: "/tools#profit-calculator" },
      { label: "Market News", to: "/markets" },
      { label: "Economic Calendar", to: "/markets" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "https://twitter.com/pipsstore", icon: "ph:x-logo" },
  { label: "YouTube", href: "https://youtube.com/@pipsstore", icon: "ph:youtube-logo" },
  { label: "Instagram", href: "https://instagram.com/pipsstore", icon: "ph:instagram-logo" },
  { label: "Telegram", href: "https://t.me/pipsstore", icon: "ph:telegram-logo" },
];

export const RISK_WARNING =
  "Trading forex involves a high level of risk and you can lose all of the money you trade with. PipsStore is an education provider only. We are not a trading company, broker or financial adviser, we don't provide trading, investment or financial services, and we don't give trading advice.";

export const DISCLAIMER_TEXT =
  "Everything on PipsStore, including our paid mentoring packages and one-on-one consultations, is education only and is not financial or trading advice. Trading involves high risk and you can lose all of your money. We are not a trading company and don't provide trading or financial services.";

export const EDUCATIONAL_DISCLAIMER_LONG =
  "PipsStore provides free educational material about the foreign exchange market, and optional paid mentoring packages that are also purely educational. We are not a trading company, a broker, a financial adviser or a signals service. We don't provide trading, investment or financial services, we don't give trading advice or trade calls, we don't open or manage trading accounts, and we make no promises about profit. Foreign exchange trading carries a high level of risk, may not be suitable for every investor, and can result in the loss of all of your capital. Before trading real money, make sure you fully understand the risks involved and, if needed, seek advice from an independent licensed professional.";

export const CONTACT_INFO = {
  email: "trade@pipsstore.com",
  responseTime: "We usually reply within 1–2 business days.",
  hours: "Support hours: Monday to Friday, 9am – 5pm (UTC)",
};

export const EXPERIENCE_OPTIONS = ["Beginner", "Intermediate", "Expert"];
