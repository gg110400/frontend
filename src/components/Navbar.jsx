import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import '../components/Navbar.css';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn]= useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // NEW! Approccio migliore - Controlla se esiste un token nel localStorage
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await getUserData();
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token non valido:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    // Controlla lo stato di login all'avvio
    checkLoginStatus();

    // Aggiungi un event listener per controllare lo stato di login
    window.addEventListener("storage", checkLoginStatus);
    // NEW! Evento per il cambio di stato
    window.addEventListener("loginStateChange", checkLoginStatus);

    // NEW! Rimuovi l'event listener quando il componente viene smontato e quando cambia
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("loginStateChange", checkLoginStatus);
    };
  }, []);
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className='nav'>
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">New Post</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li><h1><a href="/"  id="site-title">I Miei Amici Cuccioli 🐾</a></h1></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><h1><a href="/"  id="site-title">I Miei Amici Cuccioli 🐾</a></h1></li>
          </>
        )}
      </ul>
    </nav>
  );
}