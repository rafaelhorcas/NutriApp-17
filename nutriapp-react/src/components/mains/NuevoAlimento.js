import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NuevoAlimento(props) {

  const location = useLocation();
  const product = location.state?.product;
  let navigate = useNavigate();
  const [alimento, setAlimento] = useState({
    nombre: '',
    cantidad: '',
    calorias: '',
    proteinas: '',
    carbohidratos: '',
    grasas: ''
  });

  useEffect(() => {
    if (product) {
      setAlimento({
        nombre: product.product_name || '',
        cantidad: product.quantity || '',
        calorias: product.nutriments.energy || '',
        proteinas: product.nutriments.proteins || '',
        carbohidratos: product.nutriments.carbohydrates || '',
        grasas: product.nutriments.fat || ''
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que se ingresen todos los campos antes de agregar el alimento
    if (!alimento.nombre || !alimento.cantidad || !alimento.calorias || !alimento.proteinas || !alimento.carbohidratos || !alimento.grasas) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/registroAlimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cantidad: alimento.cantidad,
          usuario: props.usuario,
          fecha: props.fecha,
          alimento: {
            nombre: alimento.nombre,
            calorias: alimento.calorias,
            proteinas: alimento.proteinas,
            carbohidratos: alimento.carbohidratos,
            grasas: alimento.grasas
          }
        }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Error al añadir alimento');
      }

      // Manejar la respuesta si es necesario
      console.log('Alimento añadido correctamente');
      // Limpiar los campos del formulario después de agregar el alimento
      setAlimento({
        nombre: '',
        cantidad: '',
        calorias: '',
        proteinas: '',
        carbohidratos: '',
        grasas: ''
      });
      navigate("/registroalimentos")
      } catch (error) {
        console.error('Error:', error);
      }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlimento({ ...alimento, [name]: value });
  };

  return (
    <div className='main'>
      <h2>Nuevo Alimento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formNombre">
          <Form.Label column sm={2}>Nombre</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="nombre" placeholder="Nombre del alimento" value={alimento.nombre} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCantidad">
          <Form.Label column sm={2}>Cantidad</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="cantidad" placeholder="Cantidad de alimento" value={alimento.cantidad} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCal">
          <Form.Label column sm={2}>Calorías</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="calorias" placeholder="Número de calorías" value={alimento.calorias} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formProt">
          <Form.Label column sm={2}>Proteinas</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="proteinas" placeholder="Número de proteínas" value={alimento.proteinas} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCHO">
          <Form.Label column sm={2}>Carbohidratos</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="carbohidratos" placeholder="Número de carbohidratos" value={alimento.carbohidratos} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGra">
          <Form.Label column sm={2}>Grasas</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="grasas" placeholder="Número de grasas" value={alimento.grasas} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        
        <Button variant="success" type="submit" onClick={handleSubmit}>Añadir</Button>
      </Form>
    </div>
  );
}
