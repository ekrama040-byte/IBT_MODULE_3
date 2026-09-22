import Dish from "./Dish";

export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }
  return (
    <div className="dish-list">
      {dishes.map((d) => (
        <Dish key={d.id} {...d} />
      ))}
    </div>
  );
}
