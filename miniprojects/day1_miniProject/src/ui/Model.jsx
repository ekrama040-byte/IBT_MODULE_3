import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default function Modal({ dish, onClose }) {
  const closeBtn = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    closeBtn.current?.focus();
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => { window.removeEventListener('keydown', handleKey); prev?.focus(); };
  }, [onClose]);
  if (!dish) return null;
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <h3>{dish.name}</h3><p>{dish.price} ETB</p>
        <button ref={closeBtn} onClick={onClose}>Close (Esc)</button>
      </div>
    </div>,
    document.body
  );
}
Modal.propTypes = { dish: PropTypes.shape({ name: PropTypes.string, price: PropTypes.number }), onClose: PropTypes.func.isRequired };