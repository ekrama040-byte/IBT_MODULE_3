import Header from "./Header";
import Dish from "./Dish";

const menuItems = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Kitfo", price: 280 },
  { id: 3, name: "Shiro", price: 150 },
  { id: 4, name: "Special Tibs", price: 320 },
];

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="menu">
        {menuItems.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}
