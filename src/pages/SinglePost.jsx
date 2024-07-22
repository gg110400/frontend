import { useState, useEffect } from "react"; // Importa i hook useState e useEffect da React
import { useParams, Link } from "react-router-dom"; // Importa useParams e Link da react-router-dom per gestire i parametri dell'URL e creare link
import { getSinglePost, getComments, addComment, getUserData } from "../services/api.js"; // Importa le funzioni API per interagire con il backend
import "./SinglePost.css"; // Importa il file CSS per il componente PostDetail

export default function PostDetail() {
  const [post, setPost] = useState(null); // Stato per memorizzare i dati del post
  const [comments, setComments] = useState([]); // Stato per memorizzare i commenti del post
  const [newComment, setNewComment] = useState({ content: "" }); // Stato per il nuovo commento da aggiungere
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per verificare se l'utente è loggato
  const [userData, setUserData] = useState(null); // Stato per memorizzare i dati dell'utente
  const { id } = useParams(); // Ottiene l'ID del post dai parametri dell'URL

  // Effettua il fetch dei dati del post e dei commenti al caricamento del componente
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getSinglePost(id); // Ottiene i dati del post dall'API
        setPost(postData); // Imposta i dati del post nello stato
      } catch (error) {
        console.error("Errore nel caricamento del post:", error); // Logga l'errore in console
      }
    };

    const fetchComments = async () => {
      try {
        const commentsData = await getComments(id); // Ottiene i commenti del post dall'API
        setComments(commentsData || []); // Imposta i commenti nello stato, assicurandosi che sia un array
      } catch (error) {
        console.error("Errore nel caricamento dei commenti:", error); // Logga l'errore in console
      }
    };

    const checkAuthAndFetchUserData = async () => {
      const token = localStorage.getItem("token"); // Recupera il token di autenticazione dalla memoria locale
      if (token) {
        setIsLoggedIn(true); // Imposta lo stato di autenticazione a true
        try {
          const data = await getUserData(); // Ottiene i dati dell'utente autenticato dall'API
          console.log("Dati utente recuperati:", data); // Logga i dati dell'utente per il debug
          setUserData(data); // Imposta i dati dell'utente nello stato
          fetchComments(); // Carica i commenti del post
        } catch (error) {
          console.error("Errore nel recupero dei dati utente:", error); // Logga l'errore in console
          setIsLoggedIn(false); // Imposta lo stato di autenticazione a false
        }
      } else {
        setIsLoggedIn(false); // Imposta lo stato di autenticazione a false
      }
    };

    fetchPost(); // Carica i dati del post al caricamento del componente
    checkAuthAndFetchUserData(); // Verifica l'autenticazione e carica i dati dell'utente
  }, [id]); // Effettua nuovamente l'effetto quando l'ID del post cambia

  // Gestore per la sottomissione del nuovo commento
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form di ricaricare la pagina

    if (!isLoggedIn) {
      console.error("Devi effettuare il login per commentare."); // Logga un messaggio di errore se l'utente non è loggato
      alert("Devi effettuare il login per commentare."); // Mostra un messaggio di errore all'utente
      return;
    }

    if (!newComment.content.trim()) {
      console.error("Il contenuto del commento non può essere vuoto."); // Logga un messaggio di errore se il contenuto del commento è vuoto
      alert("Il contenuto del commento non può essere vuoto."); // Mostra un messaggio di errore all'utente
      return;
    }

    if (!userData) {
      console.error("Dati utente non disponibili."); // Logga un messaggio di errore se i dati dell'utente non sono disponibili
      alert("Dati utente non disponibili."); // Mostra un messaggio di errore all'utente
      return;
    }

    try {
      const commentData = {
        content: newComment.content.trim(), // Contenuto del nuovo commento
        name: `${userData.nome} ${userData.cognome}`, // Nome dell'utente
        email: userData.email, // Email dell'utente
      };

      console.log("Dati del commento da inviare:", commentData); // Logga i dati del commento per il debug

      const newCommentData = await addComment(id, commentData); // Invia il nuovo commento all'API

      // Genera un ID temporaneo se l'API non restituisce un ID in tempo
      if (!newCommentData._id) {
        newCommentData._id = Date.now().toString();
      }

      setComments((prevComments) => [...prevComments, newCommentData]); // Aggiunge il nuovo commento alla lista dei commenti
      setNewComment({ content: "" }); // Resetta il campo del nuovo commento
    } catch (error) {
      console.error("Errore nell'invio del commento:", error); // Logga l'errore in console
      alert(
        `Errore nell'invio del commento: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  if (!post) return <div>Caricamento...</div>; // Mostra un messaggio di caricamento se i dati del post non sono ancora stati caricati

  // Rendering del componente
  return (
    <div className="container">
      <article className="post-detail">
        {/* Immagine di copertina del post */}
        <img src={post.cover} alt={post.title} className="post-cover" />
        {/* Titolo del post */}
        <h1>{post.title}</h1>
        {/* Dati del post */}
        <div className="post-meta">
          <span>Categoria: {post.categoria}</span>
          <span>Autore: {post.autore}</span>
        </div>
        {/* Contenuto del post */}
        {/* dangerouslySetInnerHTML, come nel template originario che ci ha dato EPICODE è usato per renderizzare HTML "RAW", usare con cautela!!!! */}
        <div
          className="comment-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Sezione commenti */}
        <h3 className="comment-section-title">Commenti</h3>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.content}</p>
              <small>Di: {comment.name}</small>
            </div>
          ))
        ) : (
          <p>Nessun commento disponibile.</p>
        )}

        {isLoggedIn ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              placeholder="Scrivi un commento..."
            />
            <button type="submit">Invia commento</button>
          </form>
        ) : (
          <p className="no-logged-section">
            <Link to="/login">Accedi</Link> per visualizzare o lasciare
            commenti.
          </p>
        )}
      </article>
    </div>
  );
}