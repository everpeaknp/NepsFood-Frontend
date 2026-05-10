import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    images: { image: string }[];
    category?: { name: string };
    stock: number;
    short_description?: string;
    rating_average?: number;
    review_count: number;
}

interface CompareStore {
    items: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: number) => void;
    clearCompare: () => void;
    isInCompare: (productId: number) => boolean;
}

export const useCompareStore = create<CompareStore>()(
    persist(
        (set, get) => ({
            items: [],
            
            addToCompare: (product) => {
                const { items } = get();
                
                // Check if product already in compare
                if (items.some(item => item.id === product.id)) {
                    return;
                }
                
                // Limit to 4 products for comparison
                if (items.length >= 4) {
                    alert('You can only compare up to 4 products at a time. Please remove one to add another.');
                    return;
                }
                
                set({ items: [...items, product] });
            },
            
            removeFromCompare: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
            },
            
            clearCompare: () => {
                set({ items: [] });
            },
            
            isInCompare: (productId) => {
                return get().items.some(item => item.id === productId);
            }
        }),
        {
            name: 'compare-storage',
        }
    )
);
