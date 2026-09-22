import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./ui/Modal";

const Checkout = lazy(() => import("./routes/Checkout"));
const Receipt = lazy(() => import("./routes/Receipt"));

function Skeleton({ text }) {
  return <div style={{ padding: "1rem", background: "#eee", margin: "0.5rem 0" }}>Loading {text} skeleton...</div>;
}

function MenuWidget({ onSelectDish, triggerCrash }) {
  if (triggerCrash) {
    throw new Error("Deliberate menu render failure proved isolation!");
  }
  return (
    <div>
      <h3>Menu Region</h3>
      <p>Sample Doro Wat (240 ETB)</p>
      <button onClick={() => onSelectDish({ name: "Doro Wat", price: 240 })}>Open Modal</button>
    </div>
  );
}

function CartWidget() {
  return (
    <aside style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h3>Cart Region (Independent)</h3>
      <p>Header and Cart stay alive even if Menu crashes!</p>
    </aside>
  );
}

export default function App() {
  const [crashMenu, setCrashMenu] = useState(false);
  const [modalDish, setModalDish] = useState(null);

  return (
    <BrowserRouter>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "#fff" }}>
        <h1>Header (Persistent)</h1>
        <nav>
          <Link to="/" style={{ color: "#fff", margin: "0 0.5rem" }}>Home</Link>
          <Link to="/checkout" style={{ color: "#fff", margin: "0 0.5rem" }}>Checkout</Link>
          <Link to="/receipt" style={{ color: "#fff", margin: "0 0.5rem" }}>Receipt</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
        <div>
          <button onClick={() => setCrashMenu(true)} style={{ marginBottom: "1rem", background: "darkred", color: "white" }}>
            Trigger Menu Crash (Prove Isolation)
          </button>
          <ErrorBoundary
            fallback={(err, reset) => (
              <div role="alert" style={{ padding: "1rem", border: "2px solid red", background: "#ffe6e6" }}>
                <p>Menu failed: {err.message}</p>
                <button onClick={reset}>Retry Menu</button>
              </div>
            )}
          >
            <MenuWidget onSelectDish={(dish) => setModalDish(dish)} triggerCrash={crashMenu} />
          </ErrorBoundary>

          <Routes>
            <Route path="/" element={<p>Welcome to Addis Eats Home.</p>} />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<Skeleton text="checkout" />}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="/receipt"
              element={
                <Suspense fallback={<Skeleton text="receipt" />}>
                  <Receipt />
                </Suspense>
              }
            />
          </Routes>
        </div>

        <ErrorBoundary fallback={<div role="alert">Cart crashed independently.</div>}>
          <CartWidget />
        </ErrorBoundary>
      </main>

      <Modal isOpen={Boolean(modalDish)} onClose={() => setModalDish(null)}>
        {modalDish && (
          <div>
            <h3>{modalDish.name}</h3>
            <p>Price: {modalDish.price} ETB</p>
            <button onClick={() => setModalDish(null)}>Close Modal</button>
          </div>
        )}
      </Modal>
    </BrowserRouter>
  );
}
