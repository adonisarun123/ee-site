import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OfferingsPage from './pages/OfferingsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import JoinUsPage from './pages/JoinUsPage';
import FAQPage from './pages/FAQPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CareersPage from './pages/CareersPage';

// Service sub-pages
import HealthWellnessPage from './pages/services/HealthWellnessPage';
import TechnologyPage from './pages/services/TechnologyPage';
import LeisureOutingsPage from './pages/services/LeisureOutingsPage';
import SatsangsPage from './pages/services/SatsangsPage';
import CustomEngagementsPage from './pages/services/CustomEngagementsPage';

function App() {
  const [highContrast, setHighContrast] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${highContrast ? 'high-contrast' : 'bg-warm-beige/10'}`}>
        <Header highContrast={highContrast} toggleHighContrast={toggleHighContrast} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/offerings" element={<OfferingsPage />} />
            <Route path="/offerings/health-wellness" element={<HealthWellnessPage />} />
            <Route path="/offerings/technology" element={<TechnologyPage />} />
            <Route path="/offerings/leisure-outings" element={<LeisureOutingsPage />} />
            <Route path="/offerings/satsangs" element={<SatsangsPage />} />
            <Route path="/offerings/custom-engagements" element={<CustomEngagementsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/join-us" element={<JoinUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/careers" element={<CareersPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
