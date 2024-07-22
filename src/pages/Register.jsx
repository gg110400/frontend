import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { registerUser } from '../services/api.js';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        dataDiNascita:''
    });

    const navigate=useNavigate()

     const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await registerUser(formData);
            alert('Registrazione avvenuta con successo!!');
            console.log(response);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            alert('errore durante la registrazione!!')
        }
    }

    return (
        <div className='register-container'>
        <div className='register-box'>
            <h2>Registrazione</h2>
            <form onSubmit={handleSubmit} className='register-form'>
                <div className="input-group">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="cognome">Cognome:</label>
                    <input type="text" id="cognome" name="cognome" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="dataDiNascita">Data di Nascita:</label>
                    <input type="date" id="dataDiNascita" name="dataDiNascita" onChange={handleChange} required />
                </div>
                <button type="submit">Registrati</button>
            </form>
        </div>
        </div>
    );
}

export default Register;