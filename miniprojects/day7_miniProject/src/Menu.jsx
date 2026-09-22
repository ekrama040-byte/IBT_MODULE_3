import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartStore } from "./cartStore";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  // Narrow selector for addItem action
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((data) => { setDishes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", "Wats", "Meat", "Vegetarian"];
  const filtered = category === "All" ? dishes : dishes.filter((d) => d.category === category);
  const handleCatChange = (cat) => {
    if (cat === "All") searchParams.delete("category");
    else searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  if (loading) return <p>Loading menu...</p>;

  return (
    <div>
      <h2>Menu</h2>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {categories.map((c) => (
          <button key={c} onClick={() => handleCatChange(c)} style={{ fontWeight: category === c ? "bold" : "normal" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {filtered.map((d) => (
          <div key={d.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <Link to={`/menu/${d.id}`}><h3>{d.name}</h3></Link>
            <p>{d.price} ETB</p>
            <button onClick={() => addItem(d)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
