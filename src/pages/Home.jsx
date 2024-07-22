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
            <h1>Benvenuto sul AdottaUnAmico.it</h1>
            <h2>Scegli quale cucciolo adottare</h2>
            {/* Rendering dei post */}
            <div className="post-container">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                        <div className="post">
                            <div><img src={post.cover} alt={post.titolo} className='post-image'/></div>
                            <div><h3 className='post-title'>{post.titolo} </h3></div>
                            <div><h4 className='post-category'>Categoria: <span>{post.categoria}</span></h4></div>
                            <div><p className='post-content'>{post.content}</p></div>
                            <div><p className='post-author'><span>Autore: {post.autore}</span> </p></div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;