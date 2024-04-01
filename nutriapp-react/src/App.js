import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/mains/Main';
import Habitos from './components/mains/Habitos.js';
import Sidebar from './components/Sidebar';
import Title from './components/Title';
import RegistroAlimento from './components/mains/RegistroAlimento';
import NuevoAlimento from './components/mains/NuevoAlimento';
import { mock_alimentos } from './constants/alimentos.js';

import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';



export default function App() {

  const [alimentos, setAlimentos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
      setAlimentos(mock_alimentos.alimentos);
    }, []);

  const agregarAlimento = (nuevoAlimento) => {
    setAlimentos([...alimentos, nuevoAlimento]);
    navigate('/registro');
  };

  return (
    <Container fluid>
      <Title/>
      <Header/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/registro" element={<RegistroAlimento alimentos={alimentos}/>} />
        <Route path="/nuevoalimento" element={<NuevoAlimento agregarAlimento={agregarAlimento}/>} />
        <Route path="/habitos" element={<Habitos/>} />
      </Routes>
      <Footer/>
    </Container>
  );
}
