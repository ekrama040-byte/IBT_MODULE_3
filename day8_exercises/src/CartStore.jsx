import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (dish) => {
        const current = get().items;
        const idx = current.findIndex((item) => item.id === dish.id);
        if (idx > -1) {
          const updated = [...current];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
          set({ items: updated });
        } else {
          set({ items: [...current, { ...dish, quantity: 1 }] });
        }
      },
      remove: (id) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: 'addis-eats-cart' }
  )
);