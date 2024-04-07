import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function RegistroAlimentos(props) {
    const [alimentos, setAlimentos] = useState([]);

    useEffect(() => {
        const obtenerAlimentos = async () => {
            try {
                const response = await fetch(`http://localhost:8080/registroDiario/${props.usuario.email}?fecha=${props.fecha}`);
                console.log(`http://localhost:8080/registroDiario/${props.usuario.email}?fecha=${props.fecha}`)
                if (!response.ok) {
                    throw new Error('Error al obtener alimentos');
                }
                const data = await response.json();
                setAlimentos(data);
                console.log(data)
            } catch (error) {
                console.error('Error al obtener alimentos:', error);
            }
        };
        obtenerAlimentos();
    }, [props.usuario.email, props.fecha]);

    return (
        <div className='main'>
        <h1>Registro de Comidas del día XX/YY/ZZ</h1>
        <div className='botones'>
            <Button variant="success" href="/busqueda">Rúsqueda de alimentos</Button> 
            <Button variant="success" href="/nuevoalimento">Añadir nuevo alimento</Button> 
        </div>
        <div id="encabezado-tabla"> 
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
                {alimentos.map((registro, index) => (
                    <tr key={index}>
                        <td>{registro.alimento.nombre}</td>
                        <td>{registro.cantidad}</td>
                        <td>{registro.alimento.calorias}</td>
                        <td>{registro.alimento.proteinas}</td>
                        <td>{registro.alimento.carbohidratos}</td>
                        <td>{registro.alimento.grasas}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>

    );
}



