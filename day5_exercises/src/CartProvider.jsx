import { createContext, useContext, useReducer, useMemo } from 'react';
import { cartReducer } from './cartReducer';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  // Step 6: Memoize the provider value object with useMemo.
  // What it prevents: Prevents all consumer components subscribing to CartContext from triggering 
  // cascading re-renders on parent re-renders when state or dispatch reference identity would 
  // otherwise generate a brand-new object literal on every render pass.
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);