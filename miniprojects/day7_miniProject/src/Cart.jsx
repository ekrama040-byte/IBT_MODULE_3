import { useCartStore } from "./cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  // Narrow selectors
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  if (items.length === 0) return <div><p>Cart is empty.</p><Link to="/menu">Menu</Link></div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map((i) => (
        <div key={i.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span>{i.name} x {i.quantity || 1}</span>
          <span>{i.price * (i.quantity || 1)} ETB <button onClick={() => remove(i.id)}>Remove</button></span>
        </div>
      ))}
      <h3>Total: {total} ETB</h3>
      <button onClick={clear}>Clear</button>
      <br /><br />
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}
