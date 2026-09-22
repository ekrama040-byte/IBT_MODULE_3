import { useState, useCallback } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { CartProvider, useCart } from './CartProvider';
import { useFetch } from './useFetch';
import Dish from './Dish';

// Deeply nested consumer to prove ThemeContext works (Step 1)
function DeepThemeBadge() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={{ padding: '8px', background: theme === 'dark' ? '#333' : '#eee', color: theme === 'dark' ? '#fff' : '#000' }}>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function MenuList() {
  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const { dispatch, total } = useCart();
  const [filterText, setFilterText] = useState('');

  // Step 7: useCallback ensures reference stability for the child handler, 
  // preventing React.memo from breaking when App re-renders due to filterText updates.
  const handleAddDish = useCallback((dish) => {
    dispatch({ type: 'ADD', payload: dish });
  }, [dispatch]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  const filtered = dishes.filter((d) => d.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Filter dishes..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="dish-grid">
        {filtered.map((dish) => (
          <Dish key={dish.id} id={dish.id} name={dish.name} price={dish.price} onAdd={handleAddDish} />
        ))}
      </div>
      <h3>Cart Total: {total} ETB</h3>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <DeepThemeBadge />
          <MenuList />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}