import Header from "../components/Header";
import Hero from "@/components/Hero";
import Features from "../components/Features";
import BestSellingProducts from "../components/BestSellingProducts";
import ScrollingOfferBanner from "@/components/ScrollingOfferBanner";
import MarketplaceBanners from "../components/MarketplaceBanners";
import ShopByCategories from "@/components/ShopByCategories";
import PromoBanner from "@/components/PromoBanner";
import ProductShowcase from "../components/ProductShowcase";
import Newsletter from "../components/Newsletter";
import Testimonial from "@/components/Testimonial";
import FAQ from "../components/FAQ";
import Footer1 from "@/components/Footer1";
import Footer3 from "@/components/Footer3";
import Footer2 from "../components/Footer2";
import CopyrightFooter from "../components/CopyrightFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Horizontal Divider */}
      <div className="w-full border-t border-gray-200"></div>

      {/* Best Selling Products Section */}
      <BestSellingProducts />

      {/* Scrolling Offer Banner */}
      <ScrollingOfferBanner />

      {/* Marketplace Banners */}
      <MarketplaceBanners />

      {/* Shop by Categories */}
      <ShopByCategories />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Newsletter */}
      <Newsletter />

      {/* Testimonial */}
      <Testimonial />

      {/* FAQ */}
      <FAQ />

      {/* Scrolling Banner - App Download & Contact */}
      <Footer1 />

      {/* Footer - Newsletter Subscription */}
      <Footer3 />

      {/* Footer Links */}
      <Footer2 />

      {/* Copyright Footer */}
      <CopyrightFooter />
    </div>
  );
}