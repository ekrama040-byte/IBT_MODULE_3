import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default function DishModal({ dish, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Save previous active focus element
    const previousActiveElement = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus on exit/unmount
      previousActiveElement?.focus();
    };
  }, [onClose]);

  if (!dish) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3>{dish.name}</h3>
        <p>Price: {dish.price} ETB</p>
        <button ref={closeButtonRef} onClick={onClose}>
          Close (Esc)
        </button>
      </div>
    </div>,
    document.body
  );
}

DishModal.propTypes = {
  dish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};