import { useState } from 'react';

export default function DeliveryForm() {
  const [form, setForm] = useState({ name: '', phone: '', area: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // TeleBirr phone validation: e.g., starts with 09 or 07 and 10 digits total
  const isPhoneValid = /^(09|07)\d{8}$/.test(form.phone);
  const isFormValid = form.name.trim() !== '' && isPhoneValid && form.area.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order submitted via TeleBirr!');
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
      <h3>Delivery Details</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="TeleBirr phone (e.g. 0911223344)"
        value={form.phone}
        onChange={handleChange}
      />
      {!isPhoneValid && form.phone.length > 0 && (
        <span className="error">Invalid TeleBirr number format</span>
      )}
      <input
        type="text"
        name="area"
        placeholder="Area / Neighborhood"
        value={form.area}
        onChange={handleChange}
      />
      <button type="submit" disabled={!isFormValid}>
        Submit Order
      </button>
    </form>
  );
}