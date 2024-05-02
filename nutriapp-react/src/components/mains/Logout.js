import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
  let navigate = useNavigate();

  useEffect(() => {
    const usuario = {
      email: '',
      esPremium: false
    };

    props.setUsuario(usuario);
    props.setAutenticado(false);

    navigate('/');
  }, [navigate, props]);

  return null; // No necesitas retornar ningún elemento ya que este componente no renderiza nada
}
