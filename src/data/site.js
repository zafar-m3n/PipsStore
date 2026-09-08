/* Site-wide static content: nav, footer, disclaimer, contact details. */

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Academy", to: "/academy" },
  { label: "Markets", to: "/markets" },
  { label: "Analysis", to: "/analysis" },
  { label: "Tools", to: "/tools" },
  { label: "About", to: "/about" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Home", to: "/" },
      { label: "About PipsStore", to: "/about" },
      { label: "Market Insights", to: "/markets" },
      { label: "Chart Analysis", to: "/analysis" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "All Courses", to: "/academy" },
      { label: "Beginner Path", to: "/academy" },
      { label: "Glossary", to: "/academy" },
      { label: "Beginner Roadmap", to: "/" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Pip Calculator", to: "/tools" },
      { label: "Profit Calculator", to: "/tools" },
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

export const DISCLAIMER_TEXT =
  "All content on PipsStore is for educational purposes only and should not be considered financial advice. Trading involves risk, and you should always do your own research before making any financial decisions.";

export const EDUCATIONAL_DISCLAIMER_LONG =
  "PipsStore provides free educational material about the foreign exchange market. We are not a broker, a financial adviser, or a signals service. We never sell trading signals and we make no promises about profit. Foreign exchange trading carries a high level of risk and may not be suitable for every investor. Before trading real money, make sure you fully understand the risks involved and, if needed, seek advice from an independent licensed professional.";

export const CONTACT_INFO = {
  email: "support@pipsstore.com",
  responseTime: "We usually reply within 1–2 business days.",
  hours: "Support hours: Monday to Friday, 9am – 5pm (UTC)",
};

export const EXPERIENCE_OPTIONS = ["Beginner", "Intermediate", "Expert"];
