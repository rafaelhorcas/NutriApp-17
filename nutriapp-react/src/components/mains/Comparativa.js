import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import React, { useState } from 'react';
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';

export default function Comparativa(props) {
    //Variables de estado
    const [nombre, setNombre] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    //Funciones
    const handleSelectProduct = (product) => {
        const isSelected = selectedProducts.some(selectedProduct => selectedProduct.code === product.code);
        isSelected
            ? setSelectedProducts(selectedProducts.filter(selectedProduct => selectedProduct.code !== product.code))
            : setSelectedProducts([...selectedProducts, product]);
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

    const highlightNutrients = (value, type) => {
        const maxValue = Math.max(...selectedProducts.map(product => product.nutriments[type]));
        const minValue = Math.min(...selectedProducts.map(product => product.nutriments[type]));
        if (value === maxValue) return 'text-danger'; // Resalta el valor más alto en rojo
        if (value === minValue) return 'text-success'; // Resalta el valor más bajo en verde
        return ''; // No resalta otros valores
    };

    const sortProducts = (type) => {
        const sortedProducts = [...selectedProducts].sort((a, b) => {
            const nutrientA = a.nutriments[type];
            const nutrientB = b.nutriments[type];
            return nutrientA - nutrientB;
        });
        setSelectedProducts(sortedProducts);
    };

    return (
        <div>
            {console.log("Comparativa_premium:",props.usuario.esPremium)}
        {props.usuario.esPremium ? (    
        <div className='main'>
            <div className='seccion-header'>
                <h1>Comparativa de alimentos</h1>
            </div>
            <Form style={{ padding: '5px' }} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <Form.Group as={Row} className="mb-3" controlId="formNombre">
                    <Form.Label column sm={2}>Nombre</Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Nombre del alimento" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Button variant="success" type="submit">Buscar</Button>
                    </Col>
                </Form.Group>
            </Form>

            {selectedProducts.length > 0 && (
                <div className="mt-4">
                    <h3>Información Nutricional de los Alimentos Seleccionados:</h3>
                    <DropdownButton id="dropdown-basic-button" title="Ordenar por">
                        <Dropdown.Item onClick={() => sortProducts('energy')}>Calorías</Dropdown.Item>
                        <Dropdown.Item onClick={() => sortProducts('proteins')}>Proteínas</Dropdown.Item>
                        <Dropdown.Item onClick={() => sortProducts('carbohydrates')}>Carbohidratos</Dropdown.Item>
                        <Dropdown.Item onClick={() => sortProducts('fat')}>Grasas</Dropdown.Item>
                    </DropdownButton>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {selectedProducts.map(({ code, product_name, categories, brands, quantity, nutriments }) => (
                            <Col key={code}>
                                <Card className="custom-card">
                                    <Card.Body>
                                        <Card.Title>{product_name}</Card.Title>
                                        <Card.Text className={highlightNutrients(nutriments.energy, 'energy')}>Calorías: {nutriments.energy} kcal</Card.Text>
                                        <Card.Text className={highlightNutrients(nutriments.proteins, 'proteins')}>Proteínas: {nutriments.proteins} g</Card.Text>
                                        <Card.Text className={highlightNutrients(nutriments.carbohydrates, 'carbohydrates')}>Carbohidratos: {nutriments.carbohydrates} g</Card.Text>
                                        <Card.Text className={highlightNutrients(nutriments.fat, 'fat')}>Grasas: {nutriments.fat} g</Card.Text>
                                        <Button variant="danger" onClick={() => handleSelectProduct({ code })}>Quitar de Comparación</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

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
                                        <Button
                                            variant={selectedProducts.some(selectedProduct => selectedProduct.code === product.code) ? "danger" : "success"}
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            {selectedProducts.some(selectedProduct => selectedProduct.code === product.code) ? "Quitar de Comparación" : "Comparar"}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

        </div>
        ) : (
            <p>No eres usuario de pago</p>
          )}
        </div>
    );
}





