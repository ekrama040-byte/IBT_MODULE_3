import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

export default function Layout() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const totalCount = items.reduce((acc, i) => acc + (i.quantity || 1), 0);

  return (
    <div className="layout">
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <h1>Addis Eats</h1>
        <div>{user ? <span>Hello, {user.username} <button onClick={logout}>Logout</button></span> : <span>Guest</span>}</div>
      </header>
      <nav style={{ display: "flex", gap: "1rem", padding: "0.8rem 1rem", background: "#f5f5f5" }}>
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "crimson" : "inherit" })}>Home</NavLink>
        <NavLink to="/menu" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "crimson" : "inherit" })}>Menu</NavLink>
        <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "crimson" : "inherit" })}>Cart ({totalCount})</NavLink>
        <NavLink to="/checkout" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "crimson" : "inherit" })}>Checkout</NavLink>
      </nav>
      <main style={{ padding: "1.5rem" }}><Outlet /></main>
      <footer style={{ padding: "1rem", borderTop: "1px solid #ccc", textAlign: "center" }}>© 2026 Addis Eats</footer>
    </div>
  );
}
