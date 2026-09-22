import Dish from "./Dish";
import Card from "./Card";
import { menuItems } from "./data";
import PropTypes from "prop-types";

export default function Menu({ category = "Meat" }) {
  const filtered = menuItems.filter((item) => item.category === category);

  if (filtered.length === 0) {
    return <p>No dishes found in category: {category}</p>;
  }

  return (
    <div className="menu">
      <h2>Category: {category}</h2>
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  category: PropTypes.string,
};
