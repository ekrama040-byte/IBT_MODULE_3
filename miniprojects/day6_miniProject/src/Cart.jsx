import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeItem, clearCart, total } = useCart();
  if (items.length === 0) return <div><p>Your cart is empty.</p><Link to="/menu">Go to menu</Link></div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map((i) => (
        <div key={i.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span>{i.name} x {i.quantity || 1}</span>
          <span>{i.price * (i.quantity || 1)} ETB <button onClick={() => removeItem(i.id)}>Remove</button></span>
        </div>
      ))}
      <h3>Total: {total} ETB</h3>
      <button onClick={clearCart}>Clear Cart</button>
      <br /><br />
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}
