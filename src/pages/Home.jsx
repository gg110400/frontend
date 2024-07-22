import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/api';
import '../pages/Home.css';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                console.log(response);
                setPosts(response); // Assumendo che response abbia una proprietà data che contiene un array di post
            } catch (error) {
                console.error("Errore nella fetch di tutti i post:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
         <>
            <div className='home-title'>
                <h1 style={{fontFamily: 'Arial, sans-serif'}}>Benvenuto sul AdottaUnAmico.it</h1>
                <div className='home-title-content'>
                    <p style={{height: '200px', fontFamily: 'Arial, sans-serif'}}>
                        Scopri come adottare il tuo cucciolo ideale e rendere felice un amico a quattro zampe! 
                        Qui troverai informazioni utili, consigli pratici e storie di successo per aiutarti nel tuo percorso di adozione. 
                        Unisciti a noi per fare la differenza nella vita di un animale in cerca di amore!
                    </p>
                </div>
            </div>
            <div className='home-subtitle'><h2 style={{fontFamily: 'Arial, sans-serif'}}>Scegli quale cucciolo adottare</h2></div>
            {/* Rendering dei post */}
            <div className="post-container">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                        <div className="post">
                            <div><img src={post.cover} alt={post.titolo} className='post-image'/></div>
                            <div><h3 className='post-title' style={{fontFamily: 'Arial, sans-serif'}}>{post.titolo} </h3></div>
                            <div><h4 className='post-category' style={{fontFamily: 'Arial, sans-serif'}}>Categoria: <span>{post.categoria}</span></h4></div>
                            <div><p className='post-content' style={{fontFamily: 'Arial, sans-serif'}}>{post.content}</p></div>
                            <div><p className='post-author' style={{fontFamily: 'Arial, sans-serif'}}><span>Autore: {post.autore}</span> </p></div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;