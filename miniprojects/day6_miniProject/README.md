# Addis Eats - Routed Application (Day 6 Mini-Project)

## Route Table
* `/` -> Home landing page
* `/menu` -> Category filtered menu via query strings (`?category=...`)
* `/menu/:id` -> Single dish detail (`useParams`)
* `/cart` -> Persistent cart summary
* `/checkout` -> Guarded via `RequireAuth` (preserves origin path via `location.state.from`)
* `/login` -> User sign in screen
* `*` -> 404 catch-all

## How to run it
```bash
npm install
npm run dev
```
