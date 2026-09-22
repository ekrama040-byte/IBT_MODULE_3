import { NavLink, Outlet } from "react-router-dom";
import { useCartStore } from "./cartStore";
import { useAuth } from "./useAuth";
import { useTheme } from "./useTheme";

export default function Layout() {
  // Narrow selector for cart count
  const items = useCartStore((s) => s.items);
  const totalCount = items.reduce((acc, i) => acc + (i.quantity || 1), 0);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`layout theme-${theme}`} style={{ background: theme === "dark" ? "#1a1a1a" : "#fff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <h1>Addis Eats</h1>
        <div>
          <button onClick={toggleTheme}>Theme: {theme}</button>
          <span style={{ marginLeft: "1rem" }}>
            {user ? <>Hello, {user.username} <button onClick={logout}>Logout</button></> : "Guest"}
          </span>
        </div>
      </header>
      <nav style={{ display: "flex", gap: "1rem", padding: "0.8rem 1rem", background: "#f5f5f5" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cart">Cart ({totalCount})</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
      <main style={{ padding: "1.5rem" }}><Outlet /></main>
    </div>
  );
}
