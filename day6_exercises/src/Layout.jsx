import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <header>
        <h1>Addis Eats</h1>
      </header>
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
      <main className="content">
        <Outlet />
      </main>
      <footer>© 2026 Addis Eats</footer>
    </div>
  );
}