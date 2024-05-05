import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Title from '../Title';
import Footer from '../Footer';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function NuevoUsuario() {
  //Variables de estado
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmar_contraseña: '',
    esPremium: false,
  });

  //Funciones
  let navigate = useNavigate();
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
    <div>
      <Title/>
      <div className='register'>
        <h1>Nuevo Usuario</h1>
        <Form onSubmit={handleSubmit} style={{width: "100%"}}>
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
            <Form.Check type="switch" id="custom-switch" label="Usuario Premium" checked={usuario.esPremium} onChange={handlePremiumToggle}/>
          </Form.Group>
          <div className='boton-signup'>
            <Button variant="success" type="submit">Crear</Button>
            </div>
        </Form>
      </div>
      <div className='text-privacidad'>
        <p>Política de Privacidad.</p>
        <p>Según lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril (RGPD) y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD), mediante la presente Política de Privacidad, NutriApp informa a los USUARIOS del sitio web, que es la responsable del tratamiento y usos que a los que se someten los datos de carácter personal que se recaban en la web, con la finalidad comercial y que al aceptar la presente Política, el USUARIO acepta el tratamiento de sus datos en los términos definidos en ella.</p>
        <p>NutriApp obtiene sus datos por la información facilitada por los USUARIOS, incluidos en la categoría de datos de carácter identificativo.</p>
        <p>El USUARIO tiene los siguientes derechos a acceso, rectificación y supresión, limitación del tratamiento y oposición al tratamiento de sus datos personales.</p>
        <p>De esta manera, al registrarse en NutriApp, acepta los términos y condiciones explicados anteriormente. El USUARIO tiene derecho a retirar el consentimiento otorgado en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.</p>
      </div>
      <Footer/>
    </div>
  );
}
