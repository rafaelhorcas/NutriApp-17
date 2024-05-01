import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function Login({setUsuario}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar la solicitud de inicio de sesión al backend
    const response = await fetch('http://localhost:8080/inicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password :password }),
    });

    if (response.ok) {
      // Si la respuesta es exitosa, actualizar la variable usuario en App.js
      const data = await response.json();
      console.log(data)
      setUsuario(data); // Aquí asumiendo que el backend devuelve los datos del usuario
    } else {
      // Si hay un error en la respuesta, mostrar un mensaje de error
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;

