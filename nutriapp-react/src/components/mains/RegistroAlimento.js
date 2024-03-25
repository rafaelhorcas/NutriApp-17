import React, { useState, useEffect} from 'react';
import '../../App.css'

import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistroAlimento(props) {
    
    return (
        <div className='main'>
        <h1>Registro de Comidas del día XX/YY/ZZ</h1>
        <div id="encabezado-tabla">
            <Button variant="success" href="/nuevoalimento">+</Button> 
            <h2>Lista de Alimentos</h2>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Alimento</th>
                    <th>Cantidad</th>
                    <th>Calorías</th>
                    <th>Proteinas</th>
                    <th>Carbohidratos</th>
                    <th>Grasas</th>
                </tr>
            </thead>
            <tbody>
                {props.alimentos.map((alimento, index) => (
                    <tr key={index}>
                        <td>{alimento.nombre}</td>
                        <td>{alimento.cantidad}</td>
                        <td>{alimento.calorias}</td>
                        <td>{alimento.proteinas}</td>
                        <td>{alimento.carbohidratos}</td>
                        <td>{alimento.grasas}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>

    );
}

