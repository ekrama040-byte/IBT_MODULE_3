import { useState, useEffect, useRef } from "react";
import { fetchDishes } from "./api";
import DishList from "./DishList";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const searchInputRef = useRef(null);

  const cats = ["All", "Main", "Vegan", "Grill"];

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDishes(category, controller.signal);
        setDishes(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [category]);

  if (loading) return <p>Loading the menu...</p>;
  if (error) return <p className="err">{error}</p>;

  return (
    <div className="menu-container">
      <h2>Self-Loading Menu</h2>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search menu..."
        style={{ marginBottom: "1rem", padding: "0.4rem", display: "block" }}
      />
      <div className="category-bar" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{ fontWeight: category === c ? "bold" : "normal" }}
          >
            {c}
          </button>
        ))}
      </div>
      <DishList dishes={dishes} />
    </div>
  );
}
