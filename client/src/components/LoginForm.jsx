import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";
import Footer from "./Footer";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.error) {
        setMessage(data.error);
        setPassword("");
        return;
      }

      login(data.accessToken);

      setMessage(data.message);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <AuthForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        formType="Login"
        onSubmit={handleSubmit}
        formMessage={message}
      />
      <Footer />
    </div>
  );
}

export default LoginForm;
