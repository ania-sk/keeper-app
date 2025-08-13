import { useState } from "react";
import Header from "./Header";
import AuthForm from "./AuthForm";
import Footer from "./Footer";
import { registerUser } from "../api/auth";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const data = await registerUser(email, password);
      setMessage(data.message || data.error);

      if (data.error) {
        setPassword("");
        return;
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };
  return (
    <div>
      <Header />
      <AuthForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        formType="Register"
        onSubmit={handleSubmit}
        formMessage={message}
      />
      <div className="go-to-box">
        <p>Do you have an account?</p>
        <a href="/login">Login</a>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterForm;
