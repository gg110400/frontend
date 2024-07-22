import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import '../components/Navbar.css';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn]= useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se esiste un token nel localStorage
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Controlla lo stato di login all'avvio
    checkLoginStatus();

    // Aggiungi un event listener per controllare lo stato di login
    window.addEventListener("storage", checkLoginStatus);

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">New Post</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}