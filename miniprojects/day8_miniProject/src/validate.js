const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export function validate(form) {
  const errors = {};
  if (!form.name || !form.name.trim()) {
    errors.name = "Full name is required";
  }
  if (!form.phone || !/^(?:\+251|0)(9|7)\d{8}$/.test(form.phone)) {
    errors.phone = "Valid TeleBirr phone required (e.g., 0911223344)";
  }
  if (!AREAS.includes(form.area)) {
    errors.area = "Select a valid delivery area";
  }
  return errors;
}
