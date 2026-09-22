export default function Dish({ name, price, currency = "ETB", spicy }) {
  return (
    <div className="dish" style={{ border: "1px solid #ddd", padding: "0.8rem", margin: "0.4rem 0", borderRadius: "4px" }}>
      <h3>{name} {Boolean(spicy) && <span>🌶️</span>}</h3>
      <p>{price} {currency}</p>
    </div>
  );
}
