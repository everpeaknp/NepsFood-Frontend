import { useState, useEffect } from 'react';
import { productsAPI } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  category: {
    id: number;
    name: string;
  };
  images: Array<{
    id: number;
    image: string;
    alt_text: string;
  }>;
  rating_average: number;
  review_count: number;
  created_at: string;
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: any;
  refetch: () => void;
}

export function useProducts(params?: Record<string, string>): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getAll(params);
      const data = response.data;
      // Handle both paginated and non-paginated responses
      setProducts(data.results || data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(params)]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useFeaturedProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getFeatured();
      const data = response.data;
      setProducts(data.results || data);
    } catch (err) {
      console.error('Failed to fetch featured products:', err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}

export function useBestSellingProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getBestSelling();
      const data = response.data;
      setProducts(data.results || data);
    } catch (err) {
      console.error('Failed to fetch best selling products:', err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(slugOrId: string | number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use slug for API call (backend expects slug)
      const response = await productsAPI.getBySlug(slugOrId.toString());
      setProduct(response.data);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      setError(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slugOrId) {
      fetchProduct();
    }
  }, [slugOrId]);

  return { product, loading, error, refetch: fetchProduct };
}
