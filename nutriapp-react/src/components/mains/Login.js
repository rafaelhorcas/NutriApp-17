import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Title from '../Title';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  //Variables de estado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Funciones
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de inicio de sesión al backend
      const response = await fetch('http://localhost:8080/inicio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
  
      if (response.ok) {
        // Si la respuesta es exitosa, actualizar la variable usuario en App.js
        const data = await response.json();
        props.setUsuario(data); // Aquí asumiendo que el backend devuelve los datos del usuario
        props.setAutenticado(true)
        navigate('/')
      } else {
        // Si hay un error en la respuesta, mostrar un mensaje de error
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
      setError('Usuario o contraseña incorrectos.');
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div>
      <Title/>
      <div className='login'>
      <h1>Iniciar Sesión</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className='botones'>
            <Button variant='success' type="submit">Iniciar sesión</Button>
            <Button variant='success' href='/signup'>Registrarse</Button>
          </div>
        </Form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}


