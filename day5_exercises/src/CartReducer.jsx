export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const idx = state.items.findIndex((item) => item.id === action.payload.id);
      if (idx > -1) {
        const updated = [...state.items];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

// Quick direct assertions check (run via node or mental check):
// cartReducer({ items: [{ id: 1, price: 200, quantity: 1 }] }, { type: 'ADD', payload: { id: 1, price: 200 } })
// -> { items: [{ id: 1, price: 200, quantity: 2 }] }