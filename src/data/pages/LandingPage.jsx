import Header from "../components/Header";
import Hero from "../components/Hero";
import Agenda from "../components/Agenda";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function LandingPage({ type }) {
  return (
    <div className="bg-[#0B0F1A] text-white min-h-screen">
      <Header type={type} />

      <Hero type={type} />
      <Agenda type={type} />
      <Testimonials />
      <FAQ />

      <Footer />
    </div>
  );
}