import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function NuevoUsuario(props) {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmar_contraseña: '',
  });

  const location = useLocation();
  const product = location.state?.product;

   useEffect(() => {
    if (product) {
      setUsuario({
        nombre: product.user_name || '',
        email: product.email || '',
        contraseña: product.pasword.original || '',
        confirmar_contraseña: product.pasword.confirm || '',
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que se ingresen todos los campos antes de agregar el alimento
    if (!usuario.nombre || !usuario.email || !usuario.contraseña || !usuario.confirmar_contraseña || usuario.contraseña !== usuario.confirmar_contraseña ) {
      return;
    }
    props.agregarUsuario(usuario);
    // Limpiar los campos del formulario después de agregar el alimento
    setUsuario({
        nombre: '',
        email: '',
        contraseña: '',
        confirmar_contraseña: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
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
        
        <Button variant="success" type="submit">Crear</Button>
      </Form>
    </div>
  );
}