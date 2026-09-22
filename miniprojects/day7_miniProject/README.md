# Addis Eats - Zustand Store Migration (Day 7 Mini-Project)

## State Architecture Decision
* **Cart state (`cartStore.js`)**: Moved to Zustand with `persist` middleware because it represents global, high-frequency transaction state that must survive browser reloads independent of component tree lifecycle or context provider unmounting, while allowing narrow component selectors to bypass re-render noise.
* **Session/Auth state (`useAuth.js`)**: Kept in React Context because authentication session lifecycle is tightly coupled with route guard boundaries (`RequireAuth`) and declarative component tree layout provider injection.

## How to run it
```bash
npm install
npm run dev
```
