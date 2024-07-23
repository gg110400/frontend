import axios from 'axios';


const API_URL='https://backend-blog-80o6.onrender.com/api' || 'http://localhost:3000/api';
const api=axios.create({baseURL:API_URL}); 

api.interceptors.request.use(
  (config) => {
    // Recupera il token dalla memoria locale
    const token = localStorage.getItem("token");
    if (token) {
      // Se il token esiste, aggiungilo all'header di autorizzazione
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Token inviato:", token); // Log del token inviato per debugging
    }
    return config; // Restituisce la configurazione aggiornata
  },
  (error) => {
    // Gestisce eventuali errori durante l'invio della richiesta
    return Promise.reject(error);
  }
);


//OPERAZIONI SUI POST DEL BLOG

//get di tutti i post
export const getAllPosts = async () => {
    const response = await api.get('/blogposts');
    return response.data;
}


//singolo post
export const getSinglePost = async (id) => {
    const response = await api.get(`/blogposts/${id}`);
    return response.data;
}

// Recupera tutti i commenti per un post specifico
export const getComments = (postId) =>
    api.get(`/blogposts/${postId}/comments`).then((response) => response.data);


// Aggiunge un nuovo commento a un post specifico
export const addComment = (postId, commentData) =>
    api
      .post(`/blogposts/${postId}/comments`, commentData)
      .then((response) => response.data);

// Funzione per recuperare un commento specifico
export const getComment = (postId, commentId) =>
    api
      .get(`/blogposts/${postId}/comments/${commentId}`)
      .then((response) => response.data);

// Funzione per aggiornare un commento specifico
export const updateComment = (postId, commentId, commentData) =>
    api
      .put(`/blogposts/${postId}/comments/${commentId}`, commentData)
      .then((response) => response.data);

 // Funzione per eliminare un commento specifico
export const deleteComment = (postId, commentId) =>
    api
      .delete(`/blogposts/${postId}/comments/${commentId}`)
      .then((response) => response.data);     

//creazione post
export const createPost = (postData) =>
    api.post("/blogposts", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


//aggiornamento post
export const updatePost = async (id, post) => {
    const response = await api.put(`/blogposts/${id}`, post);
    return response.data;
}

//cancellazione post
export const deletePost = async (id) => {
    const response = await api.delete(`/blogposts/${id}`);
    return response.data;
}


//rotte autenticazione

// NEW! Funzione per registrare un nuovo utente
export const registerUser = (userData) => api.post("/authors", userData);

// NEW: Funzione per effettuare il login di un utente
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials); // Effettua la richiesta di login
    console.log("Risposta API login:", response.data); // Log della risposta per debugging
    return response.data; // Restituisce i dati della risposta
  } catch (error) {
    console.error("Errore nella chiamata API di login:", error); // Log dell'errore per debugging
    throw error; // Lancia l'errore per essere gestito dal chiamante
  }
};

export const getMe = () =>
  api.get("/auth/me").then((response) => response.data);


//cerco di recuperare i dati utente
export const getUserData = async () => {
  try {
    const response = await api.get("/auth/me");
    console.log("Dati utente recuperati:", response.data); // Log della risposta
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dati utente:", error.response ? error.response.data : error.message); // Log dell'errore
    throw error;
  }
};







export default api;