export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const idx = state.items.findIndex(item => item.id === action.dish.id);
      if (idx > -1) {
        const updated = [...state.items];
        updated[idx] = { ...updated[idx], quantity: (updated[idx].quantity || 1) + 1 };
        return { items: updated };
      }
      return { items: [...state.items, { ...action.dish, quantity: 1 }] };
    }
    case "remove":
      return { items: state.items.filter(d => d.id !== action.id) };
    case "clear":
      return { items: [] };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}
