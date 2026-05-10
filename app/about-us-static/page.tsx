import Navbar from '@/components/fnep/Navbar';
import Footer from '@/components/fnep/Footer';
import AboutHero from '@/components/fnep/about/AboutHero';
import AboutStory from '@/components/fnep/about/AboutStory';
import AboutPassion from '@/components/fnep/about/AboutPassion';
import AboutMission from '@/components/fnep/about/AboutMission';
 
import PreFooterCTA from '@/components/fnep/PreFooterCTA';
import BrandSignature from '@/components/fnep/BrandSignature';

export const metadata = {
  title: 'About Us | Neps Foods',
  description: 'The story behind Neps Foods - Bringing traditional Nepalese recipes to commercial scale.',
};

import SmoothScroll from '@/components/fnep/about/SmoothScroll';

export default function AboutUsStaticPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative bg-[#FFF8F0]">
        <div className="relative z-10">
          <AboutHero />
        </div>
    
        <div className="relative z-30 bg-white">
          <AboutStory />
        </div>
        <div className="relative z-30 bg-[#FFF8F0]">
          <AboutPassion />
        </div>
        <div className="relative z-30 bg-white">
          <AboutMission />
        </div>
        <div className="relative z-30 bg-white">
          <PreFooterCTA />
        </div>
        <div className="relative z-30 bg-[#FDFCF9]">
          <BrandSignature/>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
