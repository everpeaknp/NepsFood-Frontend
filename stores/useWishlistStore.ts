import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  dateAdded: string
  stock: string
}

interface WishlistStore {
  items: WishlistItem[]
  addToWishlist: (item: Omit<WishlistItem, 'dateAdded'>) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
  getWishlistCount: () => number
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

// Sample initial data
const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Marketside Skinless Atlantic Salmon Fillet Fresh Never Frozen 0.95-1.2 lb",
    image: "/product1image.webp",
    price: 9.95,
    originalPrice: 15.00,
    dateAdded: "March 23, 2026",
    stock: "In Stock"
  },
  {
    id: 2,
    name: "RITZ Fresh Stacks Original Crackers Travel Snacks 11.8 oz",
    image: "/product2image.webp",
    price: 2.97,
    originalPrice: 5.17,
    dateAdded: "March 23, 2026",
    stock: "In Stock"
  },
  {
    id: 3,
    name: "The Cheesecake Factory At Home Famous Brown Bread Wheat Dinner Rolls",
    image: "/product3image.webp",
    price: 3.08,
    originalPrice: 6.17,
    dateAdded: "March 23, 2026",
    stock: "In Stock"
  }
];

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: initialWishlistItems,
      _hasHydrated: false,
      
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        })
      },
      
      addToWishlist: (item) => {
        const existingItem = get().items.find(wishlistItem => wishlistItem.id === item.id)
        if (!existingItem) {
          set((state) => ({
            items: [...state.items, { ...item, dateAdded: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }]
          }))
        }
      },
      
      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        })),
      
      clearWishlist: () => set({ items: [] }),
      
      isInWishlist: (id) => get().items.some(item => item.id === id),
      
      getWishlistCount: () => get().items.length
    }),
    {
      name: 'wishlist-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)