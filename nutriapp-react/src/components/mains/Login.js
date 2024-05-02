import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

export default function Login(props) {
  //Variables de estado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Funciones
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar la solicitud de inicio de sesión al backend
    const response = await fetch('http://localhost:8080/inicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    console.log(response)
    if (response.ok) {
      // Si la respuesta es exitosa, actualizar la variable usuario en App.js
      const data = await response.json();
      console.log("Respuesta /inicio",data)
      props.setUsuario(data); // Aquí asumiendo que el backend devuelve los datos del usuario
      props.setAutenticado(true)
      navigate('/')
    } else {
      // Si hay un error en la respuesta, mostrar un mensaje de error
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant='success'>Iniciar sesión</Button>
      </Form>
      <Button type="submit" variant='success' href='/signup'>Registrarse</Button>
      {error && <p>{error}</p>}
    </div>
  );
}


