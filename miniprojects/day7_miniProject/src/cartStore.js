import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) =>
        set((s) => {
          const idx = s.items.findIndex((d) => d.id === dish.id);
          if (idx > -1) {
            const copy = [...s.items];
            copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity || 1) + 1 };
            return { items: copy };
          }
          return { items: [...s.items, { ...dish, quantity: 1 }] };
        }),
      remove: (id) =>
        set((s) => ({
          items: s.items.filter((d) => d.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "addis-eats-cart" }
  )
);
