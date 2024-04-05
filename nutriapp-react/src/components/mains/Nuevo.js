
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

export default function Nuevo(props){
    
    return(


        <Row xs={1} md={2} lg={3} className="g-4">
          <Col key={props.product.code}>
            <Card>
              {//<Card.Img variant="top" src={props.product.image_url} />
              }
              <Card.Body>
                <Card.Title>{props.product.product_name}</Card.Title>
                <Card.Text>Categoría: {props.product.categories}</Card.Text>
                <Card.Text>Marca: {props.product.brands}</Card.Text>
                <Card.Text>Calorías: {props.product.nutriments.energy} kcal</Card.Text>
                <Card.Text>Proteínas: {props.product.nutriments.proteins} g</Card.Text>
                <Card.Text>Carbohidratos: {props.product.nutriments.carbohydrates} g</Card.Text>
                <Card.Text>Grasas: {props.product.nutriments.fat} g</Card.Text>
                <Button variant="success" href="/nuevo" >Seleccionar</Button> 
              </Card.Body>
            </Card>
          </Col>
      </Row>
    );

}