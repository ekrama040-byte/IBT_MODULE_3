import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Dish({ id, name, price, spicy, currency = 'ETB', onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    if (onAdd) onAdd(id, price);
  };

  return (
    <div className="dish">
      <h3>
        {name} {count > 0 && <span className="count-badge">x{count}</span>}
      </h3>
      <p>{price} {currency}</p>
      {Boolean(spicy) && <span className="badge">🌶️ Spicy</span>}
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.any,
  currency: PropTypes.string,
  onAdd: PropTypes.func,
};