import React from 'react';
import './Footer.css'; // Assicurati di avere un file CSS per lo stile

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} La Mia Azienda. Tutti i diritti riservati.</p>
                <nav>
                    <ul>
                        <li><a href="/privacy">Privacy</a></li>
                        <li><a href="/terms">Termini di Servizio</a></li>
                        <li><a href="/contact">Contatti</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
