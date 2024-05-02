import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BusquedaAlimento(props) {
    // Variables de estado
    const [nombre, setNombre] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    // Funciones
    const navigate = useNavigate();

    const handleSelectProduct = (product) => {
      navigate('/nuevoalimento', { state: { product: product } });
    };

    const handleSearch = async () => {
      try {
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${nombre}&page_size=10&json=1`);
        if (!response.ok) {
          throw new Error('Error al obtener los alimentos');
        }
        const data = await response.json();
        setSearchResults(data.products || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className='main'>
        <div className='seccion-header'>
          <h1>Nuevo Alimento</h1>
        </div>
        <Form style={{ padding: '5px' }} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <Form.Group as={Row} className="mb-3" controlId="formNombre">
            <Form.Label column sm={2}>Nombre</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Nombre del alimento" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Col>
          </Form.Group>
          <Button variant="success" type="submit">Buscar</Button>
        </Form>

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3>Resultados de la búsqueda:</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
              {searchResults.map(product => (
                <Col key={product.code}>
                  <Card className="custom-card">
                    <Card.Img variant="top" src={product.image_url} />
                    <Card.Body>
                      <Card.Title>{product.product_name}</Card.Title>
                      <Card.Text>Categoría: {product.categories}</Card.Text>
                      <Card.Text>Marca: {product.brands}</Card.Text>
                      <Card.Text>Cantidad: {product.quantity}</Card.Text>
                      <Card.Text>Calorías: {product.nutriments.energy} kcal</Card.Text>
                      <Card.Text>Proteínas: {product.nutriments.proteins} g</Card.Text>
                      <Card.Text>Carbohidratos: {product.nutriments.carbohydrates} g</Card.Text>
                      <Card.Text>Grasas: {product.nutriments.fat} g</Card.Text>
                      <Button variant="success" onClick={() => handleSelectProduct(product)}>Seleccionar</Button> 
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    );
  }