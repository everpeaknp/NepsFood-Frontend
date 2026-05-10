import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cartAPI, wishlistAPI } from '@/lib/api';

export function useCartWishlist() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const addToCart = async (productId: number, quantity: number = 1) => {
    console.log('addToCart called:', { productId, quantity, isAuthenticated });
    
    if (!isAuthenticated) {
      console.log('Not authenticated, showing login modal');
      setShowLoginModal(true);
      return { success: false, requiresAuth: true };
    }

    // Verify token exists
    const token = localStorage.getItem('access_token');
    console.log('Token exists:', !!token);
    
    if (!token) {
      console.log('No token found, showing login modal');
      setShowLoginModal(true);
      return { success: false, requiresAuth: true };
    }

    try {
      console.log('Calling cart API...');
      const response = await cartAPI.addToCart(productId, quantity);
      console.log('Cart API response:', response);
      // Trigger header refresh by dispatching custom event
      window.dispatchEvent(new CustomEvent('cart-updated'));
      return { success: true };
    } catch (error: any) {
      console.error('Add to cart error:', error);
      console.error('Error response:', error.response);
      const message = error.response?.data?.error || error.response?.data?.detail || 'Failed to add to cart';
      return { success: false, error: message };
    }
  };

  const addToWishlist = async (productId: number) => {
    console.log('addToWishlist called:', { productId, isAuthenticated });
    
    if (!isAuthenticated) {
      console.log('Not authenticated, showing login modal');
      setShowLoginModal(true);
      return { success: false, requiresAuth: true };
    }

    // Verify token exists
    const token = localStorage.getItem('access_token');
    console.log('Token exists:', !!token);
    
    if (!token) {
      console.log('No token found, showing login modal');
      setShowLoginModal(true);
      return { success: false, requiresAuth: true };
    }

    try {
      console.log('Calling wishlist API...');
      const response = await wishlistAPI.add(productId);
      console.log('Wishlist API response:', response);
      // Trigger header refresh by dispatching custom event
      window.dispatchEvent(new CustomEvent('wishlist-updated'));
      return { success: true };
    } catch (error: any) {
      console.error('Add to wishlist error:', error);
      console.error('Error response:', error.response);
      const message = error.response?.data?.error || error.response?.data?.detail || 'Failed to add to wishlist';
      return { success: false, error: message };
    }
  };

  const toggleWishlist = async (productId: number) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return { success: false, requiresAuth: true };
    }

    try {
      const response = await wishlistAPI.toggle(productId);
      // Trigger header refresh by dispatching custom event
      window.dispatchEvent(new CustomEvent('wishlist-updated'));
      return { success: true, inWishlist: response.data.in_wishlist };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to update wishlist';
      return { success: false, error: message };
    }
  };

  return {
    addToCart,
    addToWishlist,
    toggleWishlist,
    showLoginModal,
    setShowLoginModal,
    isAuthenticated,
  };
}
