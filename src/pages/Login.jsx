import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/api.js";
import "./Login.css";
import { FaGoogle, FaGithub } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }
  }, [location, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      localStorage.setItem("token", response.token);
      console.log("Token salvato nel localStorage:", response.token);
      window.dispatchEvent(new Event("storage"));
      console.log("Evento 'storage' emesso");
      console.log("Login effettuato!!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Errore durante accesso!");
    }
  };

  return (
    <div className="log-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Accedi</button>
          <button type="button" onClick={handleGoogleLogin} className="google-button">
            <FaGoogle style={{ color: "white", fontSize: "20px", marginRight: "20px" }} /> Accedi con Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
