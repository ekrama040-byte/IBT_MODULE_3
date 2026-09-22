# Week 1 Assembled Project: Addis Eats

## Custom Hook Contributions
* **`useFetch.js`**: Encapsulates async data fetching logic, managing `data`, `loading`, and `error` states, and cancels inflight requests via `AbortController` cleanup when dependencies change.
* **`CartProvider.jsx`**: Global context provider wrapping `cartReducer` state, memoizing total ETB calculations and provider context values to prevent consumer re-render cascades.
* **`Menu.jsx` / `CartBadge.jsx`**: Direct context consumers avoiding prop drilling.

## Justification of useMemo / useCallback
* **`total` in `CartProvider`**: Memoized with `useMemo` on `[state.items]` to prevent re-calculating reduce sums on parent component re-renders unless cart contents mutate.
* **`value` in `CartProvider`**: Memoized so reference stability of context value object prevents unnecessary downstream component re-renders.
* **`filteredDishes` in `Menu`**: Memoized with `useMemo` to skip array filtering execution when unrelated state or render passes occur.
* **`handleAdd` in `Menu`**: Stabilized via `useCallback` on `[dispatch]` to preserve handler reference identity.
