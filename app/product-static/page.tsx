import Navbar from '@/components/fnep/Navbar';
import Footer from '@/components/fnep/Footer';
import BrandSignature from '@/components/fnep/BrandSignature';
import ProductCatalogue from '@/components/fnep/products/ProductCatalogue';

export const metadata = {
  title: 'Ingredients Catalogue | Neps Foods',
  description: 'Explore our comprehensive range of 65+ premium ingredients, momos, pickles, and commercial food supplies.',
};

export default function ProductStaticPage() {
  return (
    <main className="relative bg-[#FDFCF9]">
      <Navbar />
      
      <ProductCatalogue />
      
      <div className="relative z-10 bg-white">
        <BrandSignature />
      </div>
      
      <Footer />
    </main>
  );
}
