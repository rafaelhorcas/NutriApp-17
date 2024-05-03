import '../App.css';

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';

const navLinkStyle = {
  color: 'white', // Hereda el color del texto del elemento padre
  textDecoration: 'none', // Quita el subrayado del enlace
  padding: '0.5rem 1rem', // Espaciado interno
  marginRight: '1rem', // Margen derecho entre enlaces
  borderRadius: '0.25rem', // Bordes redondeados
  transition: 'background-color 0.3s', // Transición suave al cambiar el color de fondo
  backgroundColor: '#18B157'
};

const navBrandStyle = {
  marginLeft: '10px',
  padding: '5px'
}
export default function Header () {
  return (
    <div className='header'>
      <Navbar bg="dark" data-bs-theme="dark"  >
        <Navbar.Brand as={Link} to="/" style={navBrandStyle}>NutriApp</Navbar.Brand>
      <Container>
          <Nav className="me-auto">
            <NavLink style={navLinkStyle} to="/registroalimentos">Registro</NavLink>
            <NavLink style={navLinkStyle} to="/habitos">Hábitos Alimenticios</NavLink>
            <NavLink style={navLinkStyle} to="/comparativa">Comparativa</NavLink>
            <NavLink style={navLinkStyle} to="/ajustes">Ajustes</NavLink>
            <NavLink style={navLinkStyle} to="/logout">Logout</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

