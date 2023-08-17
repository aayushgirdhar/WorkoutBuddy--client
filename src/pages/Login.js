import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
