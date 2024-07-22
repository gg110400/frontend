import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/api.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Questo effect viene eseguito dopo il rendering del componente
    // e ogni volta che location o navigate cambiano

    // Estraiamo i parametri dall'URL
    const params = new URLSearchParams(location.search);
    // Cerchiamo un parametro 'token' nell'URL
    const token = params.get("token");

    if (token) {
      // Se troviamo un token, lo salviamo nel localStorage
      localStorage.setItem("token", token);
      // Dispatchamo un evento 'storage' per aggiornare altri componenti che potrebbero dipendere dal token
      window.dispatchEvent(new Event("storage"));
      // Navighiamo alla home page
      navigate("/");
    }
  }, [location, navigate]); // Questo effect dipende da location e navigate


// Funzione per gestire il login con Google
const handleGoogleLogin = () => {
    // Reindirizziamo l'utente all'endpoint del backend che inizia il processo di autenticazione Google
    window.location.href = "http://localhost:3000/api/auth/google";
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
      window.dispatchEvent(new Event("storage"));
      console.log("Login effettuato!!");
      setIsLoggedIn(true); // Cambia lo stato del contesto
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <button onClick={handleGoogleLogin}>Accedi con Google</button>
      </form>
    </div>
  );
}

export default Login;