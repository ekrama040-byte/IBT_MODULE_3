import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function DishDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((data) => { setDish(data.find((d) => String(d.id) === String(id)) || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading dish...</p>;
  if (!dish) return <div><p>Dish not found.</p><Link to="/menu">Back to menu</Link></div>;

  return (
    <div>
      <h2>{dish.name}</h2>
      <p>Price: {dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      {Boolean(dish.spicy) && <p>🌶️ Spicy</p>}
      <button onClick={() => addItem(dish)}>Add to Cart</button>
      <br /><br />
      <Link to="/menu">Back to menu</Link>
    </div>
  );
}
