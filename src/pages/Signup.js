import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, loading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup</h3>
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

      <button disabled={loading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
