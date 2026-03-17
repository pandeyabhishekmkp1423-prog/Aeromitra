import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import RegistrationForm from './components/RegistrationForm';
import Testimonials from './components/Testimonials';
import TargetAudience from './components/TargetAudience';
import FAQ from './components/FAQ';
import Agenda from './components/Agenda';
import Footer from './components/Footer';
import FormPopup from './components/FormPopup'; // ✅ ADD THIS
import { webinars } from './data/webinars';
import { WebinarType } from './types';

export default function App() {
  const [activeWebinar, setActiveWebinar] = useState<WebinarType>('pilot');
  const webinarData = webinars[activeWebinar];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">

      {/* ✅ POPUP (TOP LEVEL) */}
      <FormPopup activeWebinar={activeWebinar} />

      <Header activeWebinar={activeWebinar} onWebinarChange={setActiveWebinar} />

      <main>
        <Hero data={webinarData} />
        <Features data={webinarData} />

        {/* ✅ SAME FORM (NO CHANGE) */}
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