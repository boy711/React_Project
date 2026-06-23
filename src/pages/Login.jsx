import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password with at least 4 characters.");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/shop");
  }

  return (
    <section className="section page-section form-layout">
      <div className="page-header">
        <p className="eyebrow">Login</p>
        <h1>Welcome back</h1>
        <p>Use your fake student account to continue shopping.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="primary-button" type="submit">
          Login
        </button>
        <p className="form-note">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
