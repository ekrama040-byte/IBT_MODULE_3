import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Dish from './Dish';
import Card from './Card';
import CategoryBar from './CategoryBar';
import DeliveryForm from './DeliveryForm';

const categories = ['All', 'Wats', 'Meat', 'Vegetarian'];

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderTotal, setOrderTotal] = useState(0);
  const searchInputRef = useRef(null);

  // 2, 4, 5, 6: Fetch dishes.json, check res.ok, re-fetch on category change, abort previous request in cleanup
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('/dishes.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load menu: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  const filteredDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.content_summary || dishes.filter((dish) => dish.category === selectedCategory);

  // 1: Set document.title to the number of dishes currently shown, updating whenever the list changes.
  useEffect(() => {
    document.title = `${filteredDishes.length} dishes shown | Addis Eats`;
  }, [filteredDishes.length]);

  // 7: Focus search input on mount with useRef
  useEffect(() => {
    // Why focus has to be inside an effect: 
    // DOM elements do not exist yet during the initial render phase (render returns JSX descriptions, 
    // DOM nodes are only mounted after React commits the layout to the browser). 
    // Running focus() inside useEffect guarantees the DOM element referenced by ref is attached and ready.
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleAddDish = (id, price) => {
    setOrderTotal((prev) => prev + price);
  };

  // 3: Add loading and error state, and render each one with an early return before the list.
  if (loading) {
    return <div className="app"><p>Loading menu...</p></div>;
  }

  if (error) {
    return <div className="app"><p className="error">Error: {error}</p></div>;
  }

  return (
    <div className="app">
      <Header />
      <main className="menu">
        <div className="search-bar">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search menu..."
          />
        </div>

        <CategoryBar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filteredDishes.length === 0 ? (
          <p>No dishes found in category: {selectedCategory}</p>
        ) : (
          <div className="dish-grid">
            {filteredDishes.map((dish) => (
              <Card key={dish.id}>
                <Dish
                  id={dish.id}
                  name={dish.name}
                  price={dish.price}
                  spicy={dish.spicy}
                  onAdd={handleAddDish}
                />
              </Card>
            ))}
          </div>
        )}

        <div className="order-total">
          <h3>Total: {orderTotal} ETB</h3>
        </div>

        <DeliveryForm />
      </main>
    </div>
  );
}