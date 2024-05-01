import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function NuevoUsuario(props) {
  let navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmar_contraseña: '',
    esPremium: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handlePremiumToggle = () => {
    setUsuario({ ...usuario, esPremium: !usuario.esPremium });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario.nombre || !usuario.email || !usuario.contraseña || !usuario.confirmar_contraseña || usuario.contraseña !== usuario.confirmar_contraseña) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: usuario.email, password: usuario.contraseña, espremium: usuario.esPremium }),
      });

      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }
      console.log(response)
      // Limpiar los campos del formulario después de agregar el usuario
      setUsuario({
        nombre: '',
        email: '',
        contraseña: '',
        confirmar_contraseña: '',
        esPremium: false,
      });
      navigate('/');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='main'>
      <h2>Nuevo Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formNombre">
          <Form.Label column sm={2}>Nombre</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="nombre" placeholder="Nombre de Usuario" value={usuario.nombre} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCantidad">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="email" placeholder="Email" value={usuario.email} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCal">
          <Form.Label column sm={2}>Contraseña</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="contraseña" placeholder="Contraseña" value={usuario.contraseña} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formProt">
          <Form.Label column sm={2}>Confirmar Contraseña</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="confirmar_contraseña" placeholder="Confirmar Contraseña" value={usuario.confirmar_contraseña} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEsPremium">
          <Form.Check type="switch" id="custom-switch" label="Usuario Premium:" checked={usuario.esPremium} onChange={handlePremiumToggle}/>
        </Form.Group>
        <Button variant="success" type="submit">Crear</Button>
      </Form>
    </div>
  );
}
