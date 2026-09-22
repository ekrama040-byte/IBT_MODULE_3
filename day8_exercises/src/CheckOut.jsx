import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const AREAS = ['Bole', 'Kazanchis', 'Megenagna', 'Piassa'];

// Step 3: Pure validation function
export function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required';
  if (!/^(09|07)\d{8}$/.test(form.phone)) {
    errors.phone = 'Valid TeleBirr phone number required (e.g., 0911223344)';
  }
  if (!AREAS.includes(form.area)) {
    errors.area = 'Please select a valid delivery area';
  }
  return errors;
}

export default function Checkout({ total = 320 }) {
  // Step 1: Single state object (name, phone, area, optional notes)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: 'Bole',
    notes: '',
  });

  // Step 4: Track touched fields on blur
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    area: false,
    notes: false,
  });

  // Step 6: Submitting flag
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Step 7: Refs for focusing first bad field
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);

  // Step 3: Call validate(form) during render
  const errors = validate(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const focusFirstBadField = (errObj) => {
    const firstBad = Object.keys(errObj)[0];
    if (firstBad === 'name') nameRef.current?.focus();
    else if (firstBad === 'phone') phoneRef.current?.focus();
    else if (firstBad === 'area') areaRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all as touched on submit attempt
    setTouched({ name: true, phone: true, area: true, notes: true });

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      focusFirstBadField(currentErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setOrderSuccess(false);

    try {
      // Step 7: Simulate failed request to test error state, values retention, and focus
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TeleBirr payment timeout. Please retry.')), 1000)
      );
      setOrderSuccess(true);
    } catch (err) {
      // Keep values in state (form state untouched), show reason
      setSubmitError(err.message);
      // Fallback focus check if submission error hits or focus first field
      focusFirstBadField(currentErrors);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} className="checkout-form" noValidate>
      <h2>Checkout</h2>
      {submitError && (
        <div className="submit-error" role="alert">
          ⚠️ {submitError}
        </div>
      )}
      {orderSuccess && <div className="order-success">🎉 Order placed successfully!</div>}

      {/* Step 5: Label every field + aria-invalid, aria-describedby, role="alert" */}
      <div className="field-group">
        <label htmlFor="name">Full Name *</label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.name && Boolean(errors.name)}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
        />
        {touched.name && errors.name && (
          <span id="name-error" role="alert" className="error-text">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="phone">TeleBirr Phone *</label>
        <input
          ref={phoneRef}
          id="phone"
          name="phone"
          type="text"
          placeholder="0911223344"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.phone && Boolean(errors.phone)}
          aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
        />
        {touched.phone && errors.phone && (
          <span id="phone-error" role="alert" className="error-text">
            {errors.phone}
          </span>
        )}
      </div>

      {/* Step 2: Select for delivery area bound correctly */}
      <div className="field-group">
        <label htmlFor="area">Delivery Area *</label>
        <select
          ref={areaRef}
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.area && Boolean(errors.area)}
          aria-describedby={touched.area && errors.area ? 'area-error' : undefined}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        {touched.area && errors.area && (
          <span id="area-error" role="alert" className="error-text">
            {errors.area}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="notes">Optional Notes</label>
        <input
          id="notes"
          name="notes"
          type="text"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Step 6: disable button on submit/invalid, show ETB total in label */}
      <button type="submit" disabled={submitting || !isFormValid}>
        {submitting ? 'Submitting...' : `Pay ${total} ETB`}
      </button>
    </form>
  );
}

Checkout.propTypes = {
  total: PropTypes.number,
};