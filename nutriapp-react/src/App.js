import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Title from './components/Title';
import Ajustes from './components/mains/Ajustes.js';
import BusquedaAlimento from './components/mains/BusquedaAlimento.js';
import Comparativa from './components/mains/Comparativa.js';
import CrearUsuario from './components/mains/CrearUsuario.js';
import Habitos from './components/mains/Habitos.js';
import Login from './components/mains/Login.js';
import Logout from './components/mains/Logout.js';
import Main from './components/mains/Main';
import NuevoAlimento from './components/mains/NuevoAlimento';
import RegistroAlimentos from './components/mains/RegistroAlimentos.js';
import RegistroHistorico from './components/mains/RegistroHistorico.js';

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';


export default function App() {
  //Variables de estado
  const [fechaActual, setFechaActual] = useState('');
  const [alimentos, setAlimentos] = useState([]);
  
  /*
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState({
    email: '',
    esPremium: false,
  });
  */

  const [autenticado, setAutenticado] = useState(() => {
    const storedAuth = localStorage.getItem('autenticado');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : { email: '', esPremium: false };
  });

  //Funciones
  let navigate = useNavigate();
  
  // Obtención de la fecha
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`; // Formato DD-MM-YYYY
    setFechaActual(formattedDate);
  }, []);

  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem('autenticado', JSON.stringify(autenticado));
  }, [autenticado]);

  //Función de agregar alimentos
  const agregarAlimento = (nuevoAlimento) => {
    setAlimentos([...alimentos, nuevoAlimento]);
    navigate('/registroalimentos');
  };
  return (
    <div>
    {autenticado ? ( 
    <Container fluid>
      <Title/>
          <Header />
          <div>{!usuario.esPremium && <Sidebar />}</div>
          <Routes>
            <Route path="/" element={<Main fecha={fechaActual} usuario={usuario} />} />
            <Route path="/registroalimentos/*" element={<RegistroAlimentos alimentos={alimentos} fecha={fechaActual} usuario={usuario} />} />
            <Route path="/nuevoalimento" element={<NuevoAlimento agregarAlimento={agregarAlimento} fecha={fechaActual} usuario={usuario} />} />
            <Route path="/busqueda" element={<BusquedaAlimento agregarAlimento={agregarAlimento} fecha={fechaActual} usuario={usuario} />} />
            <Route path="/registrohistorico" element={<RegistroHistorico usuario={usuario}/>} />
            <Route path="/habitos" element={<Habitos fecha={fechaActual} usuario={usuario}/>} />
            <Route path="/comparativa" element={<Comparativa usuario={usuario}/>} />
            <Route path="/ajustes" element={<Ajustes usuario={usuario}/>} />
            <Route path="/login" element={<Login setAutenticado={setAutenticado} setUsuario={setUsuario} />} />
            <Route path="/logout" element={<Logout setAutenticado={setAutenticado} setUsuario={setUsuario} />} />
            <Route path="/signup" element={<CrearUsuario />} />
        </Routes>
      <Footer />
    </Container>
    ) : (
      <div>
          <Routes>
            <Route path="/signup" element={<CrearUsuario />} />
          </Routes>
        <Login setAutenticado={setAutenticado} setUsuario={setUsuario} />
      </div>
    )}
    </div>
  );
}
