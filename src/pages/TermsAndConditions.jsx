import { LegalPage } from "@/components/common/LegalPage.jsx";
import {
  LEGAL_LAST_UPDATED,
  TERMS_INTRO,
  TERMS_SUMMARY,
  TERMS_SECTIONS,
} from "@/data/legal.js";

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="The rules for using the PipsStore website and its free educational content."
      lastUpdated={LEGAL_LAST_UPDATED}
      intro={TERMS_INTRO}
      summary={TERMS_SUMMARY}
      sections={TERMS_SECTIONS}
      closing={{
        icon: "ph:handshake",
        heading: "In short",
        body: "PipsStore is a free educational resource. Use it to learn, not as a substitute for professional advice, and understand that any trading decisions — and their outcomes — are yours alone.",
      }}
    />
  );
}
