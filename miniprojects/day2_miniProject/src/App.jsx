import Menu from "./Menu";

export default function App() {
  return (
    <div className="app" style={{ padding: "2rem" }}>
      <h1>Addis Eats - Typed & Filtered Menu</h1>
      <Menu category="Meat" />
    </div>
  );
}
