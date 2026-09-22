import { useState, useCallback, useMemo } from "react";
import { useFetch } from "./useFetch";
import { useCart } from "./CartProvider";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", "Wats", "Meat", "Vegetarian"], []);
  
  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useCart();

  const filteredDishes = useMemo(() => {
    if (!data) return [];
    if (category === "All") return data;
    return data.filter(d => d.category === category);
  }, [data, category]);

  const handleAdd = useCallback((dish) => {
    dispatch({ type: "add", dish });
  }, [dispatch]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p className="err">Error: {error}</p>;

  return (
    <div className="menu">
      <div className="category-tabs" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {categories.map(cat => (
          <button
            key={cat}
            style={{ fontWeight: category === cat ? "bold" : "normal" }}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredDishes.length === 0 ? (
        <p>No dishes found in {category}.</p>
      ) : (
        <div className="dish-grid" style={{ display: "grid", gap: "1rem" }}>
          {filteredDishes.map(dish => (
            <div key={dish.id} className="dish-card" style={{ border: "1px solid #ccc", padding: "1rem" }}>
              <h3>{dish.name}</h3>
              <p>{dish.price} ETB</p>
              <button onClick={() => handleAdd(dish)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
