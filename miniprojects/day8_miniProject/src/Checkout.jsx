import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { validate } from "./validate";
import Field from "./Field";

const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export default function Checkout({ total = 320, onSubmitOrder }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
  };

  const errors = validate(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const focusFirstError = (errObj) => {
    const firstKey = Object.keys(errObj)[0];
    if (firstKey && fieldRefs[firstKey]?.current) {
      fieldRefs[firstKey].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, phone: true, area: true, notes: true };
    setTouched(allTouched);

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      focusFirstError(currentErrors);
      return;
    }

    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    setOrderSuccess(false);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form.name.toLowerCase() === "fail") {
            reject(new Error("Network timeout: Payment gateway unreachable. Values retained."));
          } else {
            resolve();
          }
        }, 800);
      });
      setOrderSuccess(true);
      if (onSubmitOrder) onSubmitOrder(form);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const show = (field) => touched[field] && errors[field];
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Checkout</h2>
      {submitError && (
        <div role="alert" style={{ background: "#ffe6e6", color: "#cc0000", padding: "0.8rem", marginBottom: "1rem", borderRadius: "4px" }}>
          ❌ {submitError}
        </div>
      )}
      {orderSuccess && (
        <div role="alert" style={{ background: "#e6ffe6", color: "#006600", padding: "0.8rem", marginBottom: "1rem", borderRadius: "4px" }}>
          🎉 Order placed successfully!
        </div>
      )}

      <div ref={fieldRefs.name}>
        <Field
          label="Full Name *"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show("name") ? errors.name : undefined}
          touched={touched.name}
        />
      </div>

      <div ref={fieldRefs.phone}>
        <Field
          label="TeleBirr Phone *"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show("phone") ? errors.phone : undefined}
          touched={touched.phone}
        />
      </div>

      <div ref={fieldRefs.area}>
        <Field
          label="Delivery Area *"
          id="area"
          name="area"
          as="select"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show("area") ? errors.area : undefined}
          touched={touched.area}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <Field
        label="Optional Notes"
        id="notes"
        name="notes"
        value={form.notes}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.notes}
      />

      <button
        type="submit"
        disabled={submitting || hasErrors}
        style={{
          width: "100%",
          padding: "0.8rem",
          background: submitting || hasErrors ? "#ccc" : "#333",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: submitting || hasErrors ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Submitting..." : `Pay ${total} ETB`}
      </button>
    </form>
  );
}

Checkout.propTypes = {
  total: PropTypes.number,
  onSubmitOrder: PropTypes.func,
};
