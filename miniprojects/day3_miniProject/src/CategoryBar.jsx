export default function CategoryBar({ cats, selected, onSelect }) {
  return (
    <div className="category-bar" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      {cats.map((c) => (
        <button
          key={c}
          style={{
            fontWeight: selected === c ? "bold" : "normal",
            background: selected === c ? "#333" : "#f5f5f5",
            color: selected === c ? "#fff" : "#000",
            padding: "0.4rem 0.8rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
