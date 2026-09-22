import { useState } from 'react';
import Header from './Header';
import Dish from './Dish';
import Card from './Card';
import CategoryBar from './CategoryBar';
import DeliveryForm from './DeliveryForm';

const categories = ['All', 'Wats', 'Meat', 'Vegetarian'];

const menuItems = [
  { id: 1, name: 'Doro Wat', price: 240, spicy: true, category: 'Wats' },
  { id: 2, name: 'Kitfo', price: 280, spicy: 1, category: 'Meat' },
  { id: 3, name: 'Shiro', price: 150, spicy: false, category: 'Vegetarian' },
  { id: 4, name: 'Special Tibs', price: 320, spicy: true, category: 'Meat' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderTotal, setOrderTotal] = useState(0);

  const handleAddDish = (id, price) => {
    setOrderTotal((prev) => prev + price);
  };

  const filteredDishes =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="app">
      <Header />
      <main className="menu">
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