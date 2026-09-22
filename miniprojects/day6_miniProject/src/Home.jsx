import { Link } from "react-router-dom";
export default function Home() {
  return <div><h2>Welcome to Addis Eats</h2><p>Explore our routed menu.</p><Link to="/menu">Go to Menu</Link></div>;
}
