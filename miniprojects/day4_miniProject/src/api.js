export async function fetchDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });
  if (!res.ok) throw new Error("Could not load the menu");
  const data = await res.json();
  if (category && category !== "All") {
    return data.filter(d => d.category === category);
  }
  return data;
}
