// Importa useState hook da React
import { useState, useEffect } from "react";
// Importa useNavigate da react-router-dom per la navigazione programmatica
import { useNavigate } from "react-router-dom";
// Importo la funzione createPost dal mio file services/api
import { createPost, getMe } from "../services/api";
import '../pages/CreatePost.css';


export default function CreatePost() {
  // Stato per memorizzare i dati del nuovo post
  const [post, setPost] = useState({
    titolo: "",
    categoria: "",
    content: "",
    autore: "",
  });




  // Nuovo stato per gestire il file di copertina
  const [coverFile, setCoverFile] = useState(null);

  // Hook per la navigazione
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userData = await getMe();
        setPost((prevPost) => ({ ...prevPost, autore: userData.email }));
      } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error);
        navigate("/login");
      }
    };
    fetchUserEmail();
  }, [navigate]);
  



  // Gestore per i cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Aggiornamento generale per gli altri campi
    setPost({ ...post, [name]: value });
  };

  // Nuovo gestore per il cambiamento del file di copertina
  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  // Gestore per l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creiamo un oggetto FormData per inviare sia i dati del post che il file
      const formData = new FormData();

      // Aggiungiamo tutti i campi del post al FormData
      Object.keys(post).forEach((key) => {
        formData.append(key, post[key]);
      });

      // Aggiungiamo il file di copertina se presente
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      // Invia i dati del post al backend
      await createPost(formData);
      // Naviga alla rotta della home dopo la creazione del post
      navigate("/");
    } catch (error) {
      navigate('/')
      console.error("Errore nella creazione del post:", error);
    }
  };

  // Template del componente
  return (
    <div className="create-container">
      
      <div className="form-wrapper">
        <h1>Crea un nuovo post</h1>
        <form onSubmit={handleSubmit} className="create-post-form">
          {/* Campo per il titolo */}
          <div className="form-group">
            <label>Titolo</label>
            <input
              type="text"
              id="titolo"
              name="titolo"
              value={post.titolo}
              onChange={handleChange}
              required
            />
          </div>
          {/* Campo per la categoria */}
          <div className="form-group">
            <label>Categoria</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={post.categoria}
              onChange={handleChange}
              required
            />
          </div>
          {/* Campo per il contenuto HTML */}
          <div className="form-group">
            <label>Contenuto</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
            />
          </div>
          {/* Campo per l'upload del file di copertina */}
          <div className="form-group">
            <label>Immagine di copertina</label>
            <input
              type="file"
              id="cover"
              name="cover"
              onChange={handleFileChange}
              required
            />
          </div>
          {/* Campo per l'email dell'autore */}
          <div className="form-group">
            <label>Email autore</label>
            <input
              type="email"
              id="autore"
              name="autore"
              value={post.autore}
              onChange={handleChange}
              required
            />
          </div>
          {/* Pulsante di invio */}
          <button type="submit" className="submit-button">
            Crea il post
          </button>
        </form>
      </div>
    </div>
  );
}