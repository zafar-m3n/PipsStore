/* Paid mentoring packages. Separate from the free academy, which stays free. */

export const TRIAL_DAYS = 30;

export const PACKAGES = [
  {
    id: "foundation",
    name: "Foundation",
    icon: "ph:compass",
    price: 250,
    duration: "4 weeks",
    tagline: "A structured start for complete beginners, with a mentor to check your understanding.",
    features: [
      "Structured 4-week study plan built on the Beginner path",
      "2 one-on-one consultations (60 minutes each)",
      "Weekly reading and exercise sets",
      "Email support for questions on the material",
    ],
  },
  {
    id: "guided",
    name: "Guided",
    icon: "ph:path",
    price: 600,
    duration: "8 weeks",
    tagline: "A personal learning plan and regular one-on-one sessions to keep you on track.",
    features: [
      "Personalised 8-week learning plan",
      "6 one-on-one consultations (60 minutes each)",
      "Demo-account journal reviews, focused on process and risk, never trade calls",
      "Progress check-ins every two weeks",
      "Priority email support",
    ],
  },
  {
    id: "mentorship",
    name: "Mentorship",
    icon: "ph:graduation-cap",
    price: 1200,
    duration: "12 weeks",
    tagline: "Weekly one-on-one mentoring and a curriculum shaped around how you learn.",
    features: [
      "Fully personalised 12-week curriculum",
      "Weekly one-on-one consultations (12 sessions, 60 minutes each)",
      "Demo-account journal reviews and a risk-planning workshop",
      "Trading psychology and routine-building sessions",
      "Priority email support and flexible scheduling",
    ],
  },
];

export const PACKAGE_NOTE =
  "Education and mentoring only. No trading advice, signals, trade calls or account management.";

export const TRIAL_STEPS = [
  {
    title: "Send the form",
    description: "Leave your details below. No payment and no card details are needed to start a trial.",
  },
  {
    title: "Plan your trial",
    description: "A mentor contacts you to talk through your experience and which package fits how you want to learn.",
  },
  {
    title: `Learn for ${TRIAL_DAYS} days`,
    description: `Follow your study plan for ${TRIAL_DAYS} days. At the end, you decide whether to continue.`,
  },
];

export const PACKAGE_INCLUDES = [
  "Structured study plans and reading",
  "One-on-one consultations with a mentor",
  "Explanations of concepts, charts and risk management",
  "Reviews of your demo-account journal, focused on process",
];

export const PACKAGE_EXCLUDES = [
  "Trading advice, signals or trade calls",
  "Managing, funding or opening trading accounts",
  "Investment, financial or brokerage services",
  "Promises of profit or income",
];

export const PACKAGE_FAQ = [
  {
    q: "Are these trading accounts?",
    a: "No. The packages are education and mentoring programmes. PipsStore is not a broker or a trading company, and we don't open, fund or manage trading accounts.",
  },
  {
    q: "Will a mentor tell me what to trade?",
    a: "Never. Consultations explain concepts, review your understanding and help you build a process. We don't give trading advice, signals or recommendations to buy or sell anything.",
  },
  {
    q: "How does the free trial work?",
    a: `Send the form and a mentor will contact you to plan your trial. You get ${TRIAL_DAYS} days to follow the programme with no payment taken. You only continue if you choose to.`,
  },
  {
    q: "Why do prices say \"from\"?",
    a: "The listed price is the starting price for each package. The final price depends on the schedule and number of sessions you agree with your mentor, and we confirm it with you before anything is charged.",
  },
  {
    q: "Is the free academy still free?",
    a: "Yes. The academy, glossary and calculators stay free with no account needed. The packages are a separate, optional service for people who want one-on-one guidance.",
  },
];
