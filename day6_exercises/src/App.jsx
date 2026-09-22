import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { CartProvider } from './CartProvider';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './Layout';
import MenuList from './MenuList';
import DishDetail from './DishDetail';
import RequireAuth from './RequireAuth';
import Login from './Login';

function Home() {
  return <h2>Welcome to Addis Eats Landing Page</h2>;
}

function Checkout() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Signed in as: {user?.username}</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<MenuList />} />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}