'use client';

import Navbar from '@/components/fnep/Navbar';
import Hero from '@/components/fnep/Hero';
import StatementSection from '@/components/fnep/StatementSection';
import ScaleTicker from '@/components/fnep/ScaleTicker';
import ProductShowcase from '@/components/fnep/ProductShowcase';
import Capabilities from '@/components/fnep/Capabilities';
import FactoryParallax from '@/components/fnep/FactoryParallax';
import Gallery from '@/components/fnep/Gallery';
import PreFooterCTA from '@/components/fnep/PreFooterCTA';
import BrandSignature from '@/components/fnep/BrandSignature';
import Footer from '@/components/fnep/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="relative z-10">
          <Hero />
        </div>
        <div id="video-spacer" className="relative z-10 h-[3vh] md:h-[4vh] bg-[#FFF8F0] flex items-center justify-center overflow-hidden">
         
        </div>
        <div className="relative z-30 bg-white">
          <StatementSection />
        </div>
        <div className="relative z-30 bg-white">
          <ScaleTicker />
        </div>
        <div className="relative z-30 bg-white">
          <ProductShowcase />
        </div>
        <div className="relative z-30 bg-white">
          <Capabilities />
        </div>
        <div className="relative z-30 bg-white">
          <FactoryParallax />
        </div>
        <div className="relative z-30 bg-white">
          <Gallery />
        </div>
        <div className="relative z-30 bg-white">
          <PreFooterCTA />
        </div>
        <div className="relative z-30 bg-white">
          <BrandSignature />
        </div>
      </main>
      <Footer />
    </>
  );
}
