import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const idx = state.items.findIndex((item) => item.id === action.payload.id);
      if (idx > -1) {
        state.items[idx].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action) => {
      state.items = state.items
        .map((item) => (item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;