import { useState } from "react";

export default function OrderForm({ total }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isPhoneValid = /^(?:\+251|0)(9|7)\d{8}$/.test(form.phone);
  const isFormValid = form.name.trim() !== "" && isPhoneValid && form.area.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted for ${form.name} totalling ${total} ETB!`);
  };

  return (
    <form onSubmit={handleSubmit} className="order-form" style={{ marginTop: "1.5rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
      <h3>Delivery Form</h3>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>TeleBirr Phone: </label>
        <input name="phone" placeholder="0911223344 or +251911223344" value={form.phone} onChange={handleChange} required />
        {!isPhoneValid && form.phone.length > 0 && <span style={{ color: "red", fontSize: "0.8rem", marginLeft: "0.5rem" }}>Invalid format</span>}
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Area: </label>
        <input name="area" value={form.area} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={!isFormValid}>
        Submit Order ({total} ETB)
      </button>
    </form>
  );
}
