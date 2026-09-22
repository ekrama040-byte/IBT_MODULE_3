import { useCart } from "./CartProvider";

export default function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  return <div className="cart-badge">🛒 Cart: {count} items</div>;
}
