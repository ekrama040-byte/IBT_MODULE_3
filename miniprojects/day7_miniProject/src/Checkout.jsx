import { useCartStore } from "./cartStore";
import { useAuth } from "./useAuth";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const { user } = useAuth();
  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  return (
    <div>
      <h2>Checkout</h2>
      <p>User: {user?.username}</p>
      <p>Total: {total} ETB</p>
      <button onClick={() => { alert("Placed!"); clear(); }}>Confirm Order</button>
    </div>
  );
}
