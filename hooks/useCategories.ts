import { useState, useEffect } from 'react';
import { categoriesAPI } from '@/lib/api';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  is_active: boolean;
}

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: any;
  refetch: () => void;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAPI.getAll();
      const data = response.data;
      // Ensure data is an array
      setCategories(Array.isArray(data) ? data : (data.results || []));
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
}
