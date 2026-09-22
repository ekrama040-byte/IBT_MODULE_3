import { CartProvider } from "./CartProvider";
import CartBadge from "./CartBadge";
import Menu from "./Menu";

export default function App() {
  return (
    <CartProvider>
      <div className="app" style={{ padding: "2rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h1>Addis Eats Assembled</h1>
          <CartBadge />
        </header>
        <Menu />
      </div>
    </CartProvider>
  );
}
