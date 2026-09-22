import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "./cartStore";

export default function DishDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((data) => setDish(data.find((d) => String(d.id) === String(id)) || null));
  }, [id]);

  if (!dish) return <div><p>Not found.</p><Link to="/menu">Back</Link></div>;
  return <div><h2>{dish.name}</h2><p>{dish.price} ETB</p><button onClick={() => addItem(dish)}>Add</button><br /><Link to="/menu">Back</Link></div>;
}
