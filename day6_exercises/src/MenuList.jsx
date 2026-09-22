import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from './useFetch';
import { useCart } from './CartProvider';

export default function MenuList() {
  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const { dispatch } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  const categories = ['All', 'Wats', 'Meat', 'Vegetarian'];
  const filtered = selectedCategory === 'All' 
    ? dishes 
    : dishes.filter((d) => d.category === selectedCategory);

  const handleCategorySelect = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="dish-grid">
        {filtered.map((dish) => (
          <div key={dish.id} className="dish-card">
            <Link to={`/menu/${dish.id}`}>
              <h3>{dish.name}</h3>
            </Link>
            <p>{dish.price} ETB</p>
            <button onClick={() => dispatch({ type: 'ADD', payload: dish })}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}