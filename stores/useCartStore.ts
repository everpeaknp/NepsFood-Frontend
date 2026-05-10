import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api, { cartAPI } from '@/lib/api'

export interface CartItem {
  id: number
  product: number
  product_name: string
  product_slug: string
  product_image: string | null
  quantity: number
  unit_price: string
  discount_price: string | null
  original_price: string
  subtotal: string
  stock_available: number
}

interface CartStore {
  items: CartItem[]
  loading: boolean
  error: string | null
  fetchCart: () => Promise<void>
  addToCart: (productId: number, quantity?: number) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isInCart: (productId: number) => boolean
  getCartCount: () => number
  getCartTotal: () => number
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      _hasHydrated: false,
      
      setHasHydrated: (state) => {
        set({ _hasHydrated: state })
      },
      
      fetchCart: async () => {
        try {
          set({ loading: true, error: null })
          const response = await cartAPI.getCart()
          set({ items: response.data.items || [], loading: false })
        } catch (error: any) {
          console.error('Error fetching cart:', error)
          set({ error: error.message, loading: false })
        }
      },
      
      addToCart: async (productId: number, quantity = 1) => {
        try {
          set({ loading: true, error: null })
          await cartAPI.addToCart(productId, quantity)
          await get().fetchCart()
        } catch (error: any) {
          console.error('Error adding to cart:', error)
          set({ error: error.response?.data?.error || error.message, loading: false })
          throw error
        }
      },
      
      removeFromCart: async (itemId: number) => {
        try {
          set({ loading: true, error: null })
          await cartAPI.removeItem(itemId)
          set((state) => ({
            items: state.items.filter(item => item.id !== itemId),
            loading: false
          }))
        } catch (error: any) {
          console.error('Error removing from cart:', error)
          set({ error: error.message, loading: false })
        }
      },
      
      updateQuantity: async (itemId: number, quantity: number) => {
        if (quantity <= 0) {
          await get().removeFromCart(itemId)
          return
        }
        
        try {
          set({ loading: true, error: null })
          await cartAPI.updateItem(itemId, quantity)
          set((state) => ({
            items: state.items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            ),
            loading: false
          }))
        } catch (error: any) {
          console.error('Error updating quantity:', error)
          set({ error: error.message, loading: false })
        }
      },
      
      clearCart: async () => {
        try {
          set({ loading: true, error: null })
          await cartAPI.clearCart()
          set({ items: [], loading: false })
        } catch (error: any) {
          console.error('Error clearing cart:', error)
          set({ error: error.message, loading: false })
        }
      },
      
      isInCart: (productId: number) => get().items.some(item => item.product === productId),
      
      getCartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      getCartTotal: () => get().items.reduce((total, item) => 
        total + (parseFloat(item.unit_price) * item.quantity), 0
      )
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
