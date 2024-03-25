import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/mains/Main';
import Sidebar from './components/Sidebar';
import Title from './components/Title';
import { mockdata } from './constants/alimentos.js';
import { Row, Col, Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import RegistroAlimento from './components/mains/RegistroAlimento';
import NuevoAlimento from './components/mains/NuevoAlimento';
import { useEffect } from 'react';



export default function App() {

  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
      setAlimentos(mockdata.alimentos);
    }, []);

  const agregarAlimento = (nuevoAlimento) => {
    setAlimentos([...alimentos, nuevoAlimento]);
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
      </Routes>
      <Footer/>
    </Container>
  );
}