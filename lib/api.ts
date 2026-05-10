import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/my-account';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Helper functions for token management
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// API endpoints
export const cartAPI = {
  getCart: () => api.get('/cart/'),
  addToCart: (productId: number, quantity: number = 1) => 
    api.post('/cart/add/', { product_id: productId, quantity }),
  updateItem: (itemId: number, quantity: number) => 
    api.put('/cart/update/', { item_id: itemId, quantity }),
  removeItem: (itemId: number) => 
    api.delete('/cart/remove/', { data: { item_id: itemId } }),
  clearCart: () => api.delete('/cart/clear/'),
};

export const orderAPI = {
  getOrders: () => api.get('/orders/'),
  getOrder: (id: number) => api.get(`/orders/${id}/`),
  checkout: (data: any) => api.post('/orders/checkout/', data),
  trackOrder: (id: number) => api.get(`/orders/${id}/track/`),
};

// Alias for compatibility
export const ordersAPI = {
  getAll: () => orderAPI.getOrders(),
  getById: (id: number) => orderAPI.getOrder(id),
  track: (id: number) => orderAPI.trackOrder(id),
};

export const userAPI = {
  getProfile: () => api.get('/auth/me/'),
  updateProfile: (data: any) => api.put('/auth/me/', data),
  getBillingAddress: () => api.get('/auth/billing-address/'),
  saveBillingAddress: (data: any) => api.put('/auth/billing-address/', data),
};

// Auth API
export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/auth/login/', { username, password }),
  register: (data: any) => api.post('/auth/register/', data),
  logout: (refreshToken: string) => 
    api.post('/auth/logout/', { refresh: refreshToken }),
  refreshToken: (refreshToken: string) => 
    api.post('/auth/token/refresh/', { refresh: refreshToken }),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) => api.get('/products/', { params }),
  getById: (id: number) => api.get(`/products/by-id/${id}/`),
  getBySlug: (slug: string) => api.get(`/products/${slug}/`),
  getFeatured: () => api.get('/products/', { params: { is_featured: true } }),
  getBestSelling: () => api.get('/products/', { params: { ordering: '-sales_count' } }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories/'),
  getById: (id: number) => api.get(`/categories/${id}/`),
};

// Wishlist API
export const wishlistAPI = {
  getAll: () => api.get('/auth/wishlist/'),
  add: (productId: number) => api.post('/auth/wishlist/', { product_id: productId }),
  remove: (id: number) => api.delete(`/auth/wishlist/${id}/`),
  toggle: (productId: number) => api.post('/auth/wishlist/toggle/', { product_id: productId }),
};

// Settings API
export const settingsAPI = {
  getShippingSettings: () => api.get('/settings/shipping/'),
};

// Blog API
export const blogAPI = {
  // Posts
  getAllPosts: (params?: any) => api.get('/blog/posts/', { params }),
  getPostBySlug: (slug: string) => api.get(`/blog/posts/${slug}/`),
  getFeaturedPosts: () => api.get('/blog/posts/featured/'),
  getPopularPosts: () => api.get('/blog/posts/popular/'),
  getRecentPosts: () => api.get('/blog/posts/recent/'),
  getRelatedPosts: (slug: string) => api.get(`/blog/posts/${slug}/related/`),
  
  // Categories
  getAllCategories: () => api.get('/blog/categories/'),
  getCategoryBySlug: (slug: string) => api.get(`/blog/categories/${slug}/`),
  
  // Tags
  getAllTags: () => api.get('/blog/tags/'),
  
  // Comments
  getComments: (postId: number) => api.get('/blog/comments/', { params: { post: postId } }),
  createComment: (data: any) => api.post('/blog/comments/', data),
};

// CMS API
export const cmsAPI = {
  // About Page
  getAboutHero: () => api.get('/cms/about-hero/current/'),
  getAboutSections: () => api.get('/cms/about-sections/'),
  getAboutImages: () => api.get('/cms/about-images/'),
  
  // FAQ Page
  getFAQs: () => api.get('/cms/faqs/'),
  
  // Features (used in multiple pages)
  getFeatures: () => api.get('/cms/features/'),
  
  // Testimonials
  getTestimonials: () => api.get('/cms/testimonials/'),
  
  // Vendors
  getVendors: () => api.get('/cms/vendors/'),
  
  // Contact Page
  getStores: () => api.get('/cms/stores/'),
  submitContact: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post('/cms/contact/', data),
  
  // Header & Footer
  getNavigation: () => api.get('/cms/navigation/'),
  getFooterColumns: () => api.get('/cms/footer/'),
  getSiteSettings: () => api.get('/cms/site-settings/current/'),
  
  // Mega Menu
  getMegaMenuSettings: () => api.get('/cms/megamenu-settings/current/'),
  getMegaMenuCategories: () => api.get('/cms/megamenu-categories/'),
  
  // Page Builder
  getPages: () => api.get('/cms/pages/'),
  getPageBySlug: (slug: string) => api.get(`/cms/pages/${slug}/`),
};

// Banners API
export const bannersAPI = {
  getHeroBanners: () => api.get('/banners/hero/'),
  getMarketplaceBanners: () => api.get('/banners/marketplace/'),
  getPromoBanners: () => api.get('/banners/promo/'),
  getScrollingBanners: () => api.get('/banners/scrolling/'),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string, name?: string) => 
    api.post('/core/newsletter/subscribe/', { email, name }),
  unsubscribe: (email: string, token: string) => 
    api.post('/core/newsletter/unsubscribe/', { email, token }),
};

// Reviews API
export const reviewsAPI = {
  getProductReviews: (productSlug: string) => api.get(`/products/${productSlug}/reviews/`),
  createReview: (productSlug: string, data: { rating: number; title?: string; comment: string }) => 
    api.post(`/products/${productSlug}/reviews/`, data),
  updateReview: (productSlug: string, reviewId: number, data: { rating: number; title?: string; comment: string }) => 
    api.put(`/products/${productSlug}/reviews/${reviewId}/`, data),
  deleteReview: (productSlug: string, reviewId: number) => 
    api.delete(`/products/${productSlug}/reviews/${reviewId}/`),
};
