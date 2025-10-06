import { useState } from "react";
import Header from "./Header";
import AuthForm from "./AuthForm";
import Footer from "./Footer";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const data = await registerUser(email, username, password);

      if (data.error) {
        setMessage(data.error);
        setPassword("");
        setConfirmPassword("");
        return;
      }

      if (data.accessToken) {
        login(data.accessToken);
        navigate("/");
      } else {
        setMessage("Brak tokena w odpowiedzi");
      }

      setEmail("");
      setUsername("");
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
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setUsername={setUsername}
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
