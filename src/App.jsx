import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App