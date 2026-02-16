'use client';

import { useParallax } from './hooks/useScrollAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pillars from './components/Pillars';
import Services from './components/Services';
import Industries from './components/Industries';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home() {
  useParallax();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Pillars />
        <Services />
        <Industries />
        <Portfolio />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
