import Header from "../../components/Header";
import Footer1 from "@/components/Footer1";
import ContactSection from "../../components/ContactSection";
import FeaturesInfo from "@/components/FeaturesInfo";
import Footer3 from "@/components/Footer3";
import Footer2 from "../../components/Footer2";
import CopyrightFooter from "../../components/CopyrightFooter";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Features Info Section */}
            <FeaturesInfo />

            {/* Contact Section - Our Stores & Contact Form */}
            <ContactSection />

            {/* Scrolling Banner - App Download & Contact */}
            <Footer1 />

            <Footer3 />
            <Footer2 />
            <CopyrightFooter />
        </div>
    );
}
