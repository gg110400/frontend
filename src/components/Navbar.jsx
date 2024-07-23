import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/Navbar.css";
import { getUserData } from "../services/api.js";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    console.log('Ecco il tuo token fantastico:', token);

    if (token) {
      try {
        console.log("Token recuperato:", token); // Log del token
        const userData = await getUserData(); // Recupera i dati utente
        console.log("Dati utente recuperati:", userData); // Log di successo
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Errore nella richiesta dei dati utente:", error.response ? error.response.data : error.message);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      console.error("Token non presente");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // Verifica lo stato di login all'inizio
    checkLoginStatus();

    const handleStorageChange = () => {
      console.log("Evento storage rilevato");
      checkLoginStatus();
    };

    // Ascolta l'evento storage per aggiornare lo stato di login
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <nav className="nav">
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">New Post</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <h1 style={{left: '200px'}}>
                <a href="/" id="site-title">
                  I Miei Amici Cuccioli 🐾
                </a>
              </h1>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <h1>
                <a href="/" id="site-title">
                  I Miei Amici Cuccioli 🐾
                </a>
              </h1>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
