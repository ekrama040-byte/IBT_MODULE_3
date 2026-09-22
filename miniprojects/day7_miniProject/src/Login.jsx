import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/checkout";

  return (
    <form onSubmit={(e) => { e.preventDefault(); login(username || "Guest"); navigate(from, { replace: true }); }}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
}
