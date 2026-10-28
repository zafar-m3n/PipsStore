import { Routes, Route, Navigate } from "react-router-dom";
import { useAdTracking } from "@/hooks/useAdTracking.js";
import Layout from "@/components/layout/Layout.jsx";
import Home from "@/pages/Home.jsx";
import Academy from "@/pages/Academy.jsx";
import Markets from "@/pages/Markets.jsx";
import Analysis from "@/pages/Analysis.jsx";
import Tools from "@/pages/Tools.jsx";
import About from "@/pages/About.jsx";
import ThankYou from "@/pages/ThankYou.jsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.jsx";
import TermsAndConditions from "@/pages/TermsAndConditions.jsx";

function App() {
  // Capture gclid / keyword / loc_physical into sessionStorage on mount.
  useAdTracking();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
