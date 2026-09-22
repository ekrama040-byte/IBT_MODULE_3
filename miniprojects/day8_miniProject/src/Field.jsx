import PropTypes from "prop-types";

export default function Field({ label, id, name, type = "text", value, onChange, onBlur, error, touched, as = "input", children }) {
  const showError = touched && error;
  const errorId = `${id}-error`;

  return (
    <div className="field-group" style={{ marginBottom: "1rem" }}>
      <label htmlFor={id} style={{ display: "block", fontWeight: "bold", marginBottom: "0.3rem" }}>
        {label}
      </label>
      {as === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? errorId : undefined}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? errorId : undefined}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      )}
      {showError && (
        <span id={errorId} role="alert" style={{ color: "red", fontSize: "0.85rem", display: "block", marginTop: "0.2rem" }}>
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  as: PropTypes.string,
  children: PropTypes.node,
};
