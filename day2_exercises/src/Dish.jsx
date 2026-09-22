import PropTypes from 'prop-types';

export default function Dish({ name, price, spicy, currency = 'ETB' }) {
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} {currency}</p>
      {Boolean(spicy) && <span className="badge">🌶️ Spicy</span>}
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.any,
  currency: PropTypes.string,
};