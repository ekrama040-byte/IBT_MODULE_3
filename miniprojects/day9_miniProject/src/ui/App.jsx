import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Modal from './ui/Modal';
import { useFetch } from '../../day5_exercises/src/useFetch'; // or local hook

const Checkout = lazy(() => Promise.resolve({ default: () => <h2>Checkout View</h2> }));
const Receipt = lazy(() => Promise.resolve({ default: () => <h2>Receipt View</h2> }));

function Menu() {
  const [selectedModal, setSelectedModal] = useState(null);
  const dish = { id: 1, name: 'Doro Wat', price: 240, spicy: true };
  return (
    <div>
      <ErrorBoundary fallback={<div>⚠️ Menu region failed. Cart/header safe.</div>}>
        <div>
          <h3>{dish.name}</h3>
          <button onClick={() => setSelectedModal(dish)}>Details Modal</button>
        </div>
      </ErrorBoundary>
      <Modal dish={selectedModal} onClose={() => setSelectedModal(null)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/menu">Menu</Link> | <Link to="/checkout">Checkout</Link></nav>
      <ErrorBoundary fallback={<div>⚠️ Cart/Region failed.</div>}>
        <Suspense fallback={<div>Loading chunk skeleton...</div>}>
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/receipt" element={<Receipt />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}