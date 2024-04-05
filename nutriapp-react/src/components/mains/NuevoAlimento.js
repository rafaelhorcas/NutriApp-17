import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function NuevoAlimento(props) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [calorias, setCalorias] = useState('');
  const [proteinas, setProteinas] = useState('');
  const [carbohidratos, setCarbohidratos] = useState('');
  const [grasas, setGrasas] = useState('');

  const location = useLocation();
  const product = location.state.product;

  useEffect(() => {
    setNombre(product.product_name || '');
    setCantidad(product.quantity || '');
    setCalorias(product.nutriments.energy || '');
    setProteinas(product.nutriments.proteins || '');
    setCarbohidratos(product.nutriments.carbohydrates || '');
    setGrasas(product.nutriments.fat || '');
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que se ingresen todos los campos antes de agregar el alimento
    if (!nombre || !cantidad || !calorias || !proteinas || !carbohidratos || !grasas) {
      return;
    }
    // Crear el objeto de alimento
    const nuevoAlimento = {
      nombre: nombre,
      cantidad: cantidad,
      calorias: calorias,
      proteinas: proteinas,
      carbohidratos: carbohidratos,
      grasas: grasas
    };
    // Agregar el nuevo alimento a la lista de alimentos
    props.agregarAlimento(nuevoAlimento);
    // Limpiar los campos del formulario después de agregar el alimento
    setNombre('');
    setCantidad('');
    setCalorias('');
    setProteinas('');
    setCarbohidratos('');
    setGrasas('');
  };

  return (
    <div className='main'>
      <h2>Nuevo Alimento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formNombre">
          <Form.Label column sm={2}>Nombre</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Nombre del alimento" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCantidad">
          <Form.Label column sm={2}>Cantidad</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Cantidad de alimento" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCal">
          <Form.Label column sm={2}>Calorías</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Número de calorías" value={calorias} onChange={(e) => setCalorias(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formProt">
          <Form.Label column sm={2}>Proteinas</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Número de proteínas" value={proteinas} onChange={(e) => setProteinas(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formCHO">
          <Form.Label column sm={2}>Carbohidratos</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Número de carbohidratos" value={carbohidratos} onChange={(e) => setCarbohidratos(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGra">
          <Form.Label column sm={2}>Grasas</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Número de grasas" value={grasas} onChange={(e) => setGrasas(e.target.value)} />
          </Col>
        </Form.Group>
        
        <Button variant="success" type="submit" onClick={()=>handleSubmit}>Añadir</Button>
      </Form>
    </div>
  );
}
