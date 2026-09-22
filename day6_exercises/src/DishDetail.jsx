import { useParams, Link } from 'react-router-dom';
import { useFetch } from './useFetch';

export default function DishDetail() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch('/dishes.json');

  if (loading) return <p>Loading dish details...</p>;
  if (error) return <p>Error: {error}</p>;

  const dish = dishes?.find((d) => String(d.id) === String(id));
  if (!dish) return <p>Dish not found. <Link to="/menu">Back to menu</Link></p>;

  return (
    <div className="dish-detail">
      <h2>{dish.name}</h2>
      <p>Price: {dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      {Boolean(dish.spicy) && <p>🌶️ Spicy</p>}
      <Link to="/menu">← Back to Menu</Link>
    </div>
  );
}