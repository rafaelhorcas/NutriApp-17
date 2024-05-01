import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/mains/Main';
import Habitos from './components/mains/Habitos.js';
import Ajustes from './components/mains/Ajustes.js';
import Sidebar from './components/Sidebar';
import Title from './components/Title';
import BusquedaAlimento from './components/mains/BusquedaAlimento.js';
import RegistroAlimentos from './components/mains/RegistroAlimentos.js';
import RegistroHistorico from './components/mains/RegistroHistorico.js';
import NuevoAlimento from './components/mains/NuevoAlimento';
import CrearUsuario from './components/mains/CrearUsuario.js';
import Comparativa from './components/mains/Comparativa.js';
import Login from './components/mains/Login.js';
import { mock_alimentos } from './constants/alimentos.js';

import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';



export default function App() {
  const [fechaActual, setFechaActual] = useState('');
  const [alimentos, setAlimentos] = useState([]);
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : { email: 'admin@admin.es', esPremium: true };
  });
   
  let navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`; // Formato DD-MM-YYYY
    setFechaActual(formattedDate);
    console.log(usuario)
  }, []);

  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  const agregarAlimento = (nuevoAlimento) => {
    setAlimentos([...alimentos, nuevoAlimento]);
    navigate('/registroalimentos');
  };

  return (
    <Container fluid>
      <Title/>
      <Header/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Main usuario={usuario} fecha={fechaActual}/> } />
        <Route path="/registroalimentos/*" element={<RegistroAlimentos alimentos={alimentos} usuario={usuario} fecha={fechaActual}/>} />
        <Route path="/nuevoalimento" element={<NuevoAlimento agregarAlimento={agregarAlimento} usuario={usuario} fecha={fechaActual}/>} />
        <Route path="/busqueda" element={<BusquedaAlimento agregarAlimento={agregarAlimento} usuario={usuario} fecha={fechaActual}/>} />
        <Route path="/registrohistorico" element={<RegistroHistorico usuario={usuario}/>} />
        <Route path="/habitos" element={<Habitos usuario={usuario} fecha={fechaActual}/>} />
        <Route path="/ajustes" element={<Ajustes/>} />
        <Route path="/crearusuario" element={<CrearUsuario/>} />
        <Route path="/comparativa" element={<Comparativa usuario={usuario}/>} />
      </Routes>
      <Footer/>
       <Login setUsuario={setUsuario} />
       <p>{usuario.email}</p>
    </Container>
  );
}
