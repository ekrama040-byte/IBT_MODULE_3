import { useState } from "react";
import { dishes } from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);
  const cats = ["All", "Main", "Vegan", "Grill"];

  const shown = category === "All"
    ? dishes
    : dishes.filter((d) => d.category === category);

  const handleAddDish = (price) => {
    setOrderTotal((prev) => prev + price);
  };

  return (
    <div className="menu-container">
      <h2>Interactive Menu</h2>
      <CategoryBar cats={cats} selected={category} onSelect={setCategory} />
      <DishList dishes={shown} onAddDish={handleAddDish} />
      <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.1rem" }}>
        Order Total: {orderTotal} ETB
      </div>
      <OrderForm total={orderTotal} />
    </div>
  );
}
