export default function Card({ children }) {
  return <div className="card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem 0", borderRadius: "8px" }}>{children}</div>;
}
