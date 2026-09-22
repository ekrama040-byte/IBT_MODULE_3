import Header from './Header';
import Dish from './Dish';
import Card from './Card';

const menuItems = [
  { id: 1, name: 'Doro Wat', price: 240, spicy: true, category: 'Wats' },
  { id: 2, name: 'Kitfo', price: 280, spicy: 1, category: 'Meat' },
  { id: 3, name: 'Shiro', price: 150, spicy: false, category: 'Vegetarian' },
  { id: 4, name: 'Special Tibs', price: 320, spicy: true, category: 'Meat' },
];

export default function App() {
  const selectedCategory = 'Meat';
  const filteredDishes = menuItems.filter(
    (dish) => dish.category === selectedCategory
  );

  if (filteredDishes.length === 0) {
    return (
      <div className="app">
        <Header />
        <p>No dishes found in category: {selectedCategory}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="menu">
        <h2>Category: {selectedCategory}</h2>
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <Card key={dish.id}>
              <Dish
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
              />
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}