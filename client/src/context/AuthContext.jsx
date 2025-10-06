import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      try {
        const decoded = jwtDecode(accessToken);
        setUserName(decoded.user_name || "");
      } catch (err) {
        console.error("Błąd dekodowania tokena:", err);
        setUserName("");
      }
    } else {
      localStorage.removeItem("accessToken");
      setUserName("");
    }
  }, [accessToken]);

  const login = (token) => setAccessToken(token);
  const logout = () => setAccessToken(null);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
