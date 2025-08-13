import { useState } from "react";
import AuthForm from "./AuthForm";
import { registerUser } from "../api/auth";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await registerUser(email, password);
      setMessage(data.message || data.error);

      if (data.error) {
        setPassword("");
        return;
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <AuthForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}

export default RegisterForm;
