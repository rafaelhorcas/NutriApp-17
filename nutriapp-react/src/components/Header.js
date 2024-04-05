import '../App.css';

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


export default function Header () {
  return (
    <div className='header'>
      
      <Navbar bg="dark" data-bs-theme="dark"  >
      <Navbar.Brand href="/">NutriApp</Navbar.Brand>
      <Container>
          <Nav className="me-auto">
            <Nav.Link href="/registroalimentos">Registro</Nav.Link>
            <Nav.Link href="/habitos">Hábitos Alimenticios</Nav.Link>
            <Nav.Link href="/comparativa">Comparativa</Nav.Link>
            <Nav.Link href="/ajustes">Ajustes</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

