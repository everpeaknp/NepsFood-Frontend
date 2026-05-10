import { PRODUCTS } from '@/app/product-static/products';
import ProductDetail from '@/components/fnep/products/ProductDetail';
import Navbar from '@/components/fnep/Navbar';
import Footer from '@/components/fnep/Footer';
import { notFound } from 'next/navigation';

// Static params for SSG
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetail product={product as any} />
      <Footer />
    </>
  );
}
