import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

export default function Checkout() {
  const { total, clearCart } = useCart();
  const { user } = useAuth();
  return (
    <div>
      <h2>Checkout</h2>
      <p>Checking out as: {user?.username}</p>
      <p>Order Total: {total} ETB</p>
      <button onClick={() => { alert("Order placed!"); clearCart(); }}>Complete Order</button>
    </div>
  );
}
