import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import RegistrationForm from "./components/RegistrationForm";
import Testimonials from "./components/Testimonials";
import TargetAudience from "./components/TargetAudience";
import FAQ from "./components/FAQ";
import Agenda from "./components/Agenda";
import Footer from "./components/Footer";
import FormPopup from "./components/FormPopup";

import { webinars } from "./data/webinars";
import { WebinarType } from "./types";

/* ================= PAGE ================= */
function WebinarPage() {
  const { type } = useParams();

  // ✅ THIS NOW WORKS CORRECTLY
  const activeWebinar: WebinarType =
    type === "crew" ? "cabin-crew" : "pilot";

  const webinarData = webinars[activeWebinar];

  if (!webinarData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* ✅ POPUP */}
      <FormPopup activeWebinar={activeWebinar} />

      {/* ✅ HEADER */}
      <Header activeWebinar={activeWebinar} />

      <main>
        <Hero data={webinarData} />
        <Features data={webinarData} />
        <RegistrationForm activeWebinar={activeWebinar} />
        <Agenda data={webinarData} />
        <TargetAudience data={webinarData} />
        <Testimonials />
        <FAQ data={webinarData} />
      </main>

      <Footer />
    </div>
  );
}

/* ================= ROUTER ================= */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/pilot" />} />

        {/* ✅ THIS IS THE KEY FIX */}
        <Route path="/:type" element={<WebinarPage />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/pilot" />} />
      </Routes>
    </Router>
  );
}