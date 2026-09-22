import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, NavLink, Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

// Contexts & Stores
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useCartStore } from './store/cartStore';
import { useFetch } from './hooks/useFetch';

// Components & Boundaries
import ErrorBoundary from './components/ErrorBoundary';
import Dish from './components/Dish';
import DishModal from './components/DishModal';

// Lazy Routes (Day 9)
const Checkout = lazy(() => import('./pages/Checkout'));
const Receipt = lazy(() => import('./pages/Receipt'));

function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const totalItems = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));

  return (
    <div className={`layout theme-${theme}`} style={{ background: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#000', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>Addis Eats</h1>
        <div>
          <button onClick={toggleTheme}>Theme: {theme}</button>
          <span style={{ marginLeft: '1rem' }}>User: {user?.username || 'Guest'}</span>
        </div>
      </header>
      <nav style={{ display: 'flex', gap: '1rem', padding: '0.8rem 1rem', background: '#f5f5f5' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/checkout">Checkout ({totalItems})</NavLink>
      </nav>
      <main style={{ padding: '1.5rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

function MenuList() {
  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModalDish, setSelectedModalDish] = React.useState(null);
  const selectedCategory = searchParams.get('category') || 'All';
  const categories = ['All', 'Wats', 'Meat', 'Vegetarian'];

  const handleCategorySelect = (cat) => {
    if (cat === 'All') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const getQty = (id) => cartItems.find((i) => i.id === id)?.quantity || 0;

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  const filtered = selectedCategory === 'All' ? dishes : dishes?.filter((d) => d.category === selectedCategory);

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleCategorySelect(cat)}>{cat}</button>
        ))}
      </div>
      <ErrorBoundary fallback={<div>⚠️ Dish grid isolated error. Header safe.</div>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {filtered?.map((dish) => (
            <div key={dish.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
              <Dish
                id={dish.id}
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
                quantity={getQty(dish.id)}
                onAdd={addItem}
                onDetail={setSelectedModalDish}
              />
              <Link to={`/menu/${dish.id}`} style={{ fontSize: '0.8rem' }}>View details page →</Link>
            </div>
          ))}
        </div>
      </ErrorBoundary>
      <DishModal dish={selectedModalDish} onClose={() => setSelectedModalDish(null)} />
    </div>
  );
}

function DishDetail() {
  const { id } = useParams();
  const { data: dishes } = useFetch('/dishes.json');
  const dish = dishes?.find((d) => String(d.id) === String(id));
  if (!dish) return <p>Not found. <Link to="/menu">Back</Link></p>;
  return <div><h2>{dish.name}</h2><p>{dish.price} ETB</p><Link to="/menu">← Back</Link></div>;
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function Login() {
  const [username, setUsername] = React.useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/checkout';
  return (
    <form onSubmit={(e) => { e.preventDefault(); login(username || 'HabeshaFoodie'); navigate(from, { replace: true }); }}>
      <h2>Sign In</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <button type="submit">Sign In & Return</button>
    </form>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<h2>Welcome to Addis Eats</h2>} />
              <Route path="menu" element={<ErrorBoundary fallback={<div>⚠️ Menu view crashed.</div>}><MenuList /></ErrorBoundary>} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="checkout" element={<ErrorBoundary fallback={<div>⚠️ Checkout error.</div>}><Suspense fallback={<div>Loading checkout...</div>}><RequireAuth><Checkout /></RequireAuth></Suspense></ErrorBoundary>} />
              <Route path="receipt" element={<Suspense fallback={<div>Loading...</div>}><Receipt /></Suspense>} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<h2>404 - Not Found</h2>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}