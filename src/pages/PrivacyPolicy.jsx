import { LegalPage } from "@/components/common/LegalPage.jsx";
import {
  LEGAL_LAST_UPDATED,
  PRIVACY_INTRO,
  PRIVACY_SUMMARY,
  PRIVACY_SECTIONS,
} from "@/data/legal.js";
import { CONTACT_INFO } from "@/data/site.js";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro={PRIVACY_INTRO}
      summary={PRIVACY_SUMMARY}
      sections={PRIVACY_SECTIONS}
      closing={{
        icon: "ph:lifebuoy",
        heading: "Questions about your data?",
        body: `Contact us at ${CONTACT_INFO.email} and we'll help you access, correct, or delete any personal information we hold about you.`,
      }}
    />
  );
}
