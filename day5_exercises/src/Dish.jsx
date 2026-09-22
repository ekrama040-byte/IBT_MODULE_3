import { memo } from 'react';
import PropTypes from 'prop-types';

const Dish = memo(function Dish({ id, name, price, onAdd }) {
  console.log(`Render Dish: ${name}`);
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
      <button onClick={() => onAdd({ id, name, price })}>Add to Cart</button>
    </div>
  );
});

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;