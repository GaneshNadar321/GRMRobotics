import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: any;
}

interface CartState {
  items: CartItem[];
  total: number;
  setCart: (items: CartItem[], total: number) => void;
  clearCart: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      setCart: (items, total) => set({ items, total }),

      clearCart: () => set({ items: [], total: 0 }),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
);