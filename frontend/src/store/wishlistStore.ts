import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    images: { url: string; altText?: string }[];
    category: { name: string };
    stock: number;
    isActive: boolean;
  };
  addedAt: string;
}

interface WishlistStore {
  items: WishlistItem[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      fetchWishlist: async () => {
        try {
          set({ isLoading: true });
          const response = await api.get('/wishlist');
          set({ items: response.data.items, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch wishlist:', error);
          set({ items: [], isLoading: false });
        }
      },

      addToWishlist: async (productId: string) => {
        try {
          set({ isLoading: true });
          const response = await api.post('/wishlist/items', { productId });
          
          // Refresh wishlist after adding
          await get().fetchWishlist();
          
          return response.data;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      removeFromWishlist: async (productId: string) => {
        try {
          set({ isLoading: true });
          await api.delete(`/wishlist/items/${productId}`);
          
          // Remove from local state
          const currentItems = get().items;
          const updatedItems = currentItems.filter(item => item.product.id !== productId);
          set({ items: updatedItems, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      clearWishlist: async () => {
        try {
          set({ isLoading: true });
          await api.delete('/wishlist');
          set({ items: [], isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      isInWishlist: (productId: string) => {
        const items = get().items;
        return items.some(item => item.product.id === productId);
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);