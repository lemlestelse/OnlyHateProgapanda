import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'vinyl' | 'cd' | 'cassette' | 'merch';
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (i) => i.id === item.id && (i.variant === item.variant || (!i.variant && !item.variant))
        );
        
        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += item.quantity;
          return { items: updatedItems };
        } else {
          // Item doesn't exist, add new item
          return { items: [...state.items, { ...item }] };
        }
      }),
      
      removeItem: (id, variant) => set((state) => ({
        items: state.items.filter((item) => 
          !(item.id === id && (item.variant === variant || (!item.variant && !variant)))
        )
      })),
      
      updateQuantity: (id, quantity, variant) => set((state) => ({
        items: state.items.map((item) => 
          (item.id === id && (item.variant === variant || (!item.variant && !variant)))
            ? { ...item, quantity }
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'infernal-records-cart'
    }
  )
);