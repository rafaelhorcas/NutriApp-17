import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

export default function EditarAlimento(props){

    const [nuevaCantidad, setNuevaCantidad] = useState(props.cantidad);
    let navigate = useNavigate();

    const handleCantidadChange = (event) => {
        setNuevaCantidad(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log('ID:', props.id); // Verificar que props.id tenga un valor válido
            const response = await fetch(`http://localhost:8080/registroAlimentos/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaCantidad),
            });

            if (!response.ok) {
                throw new Error('Error al editar la cantidad');
            }

            navigate("/registroalimentos")
        } catch (error) {
            console.error('Error al editar la cantidad:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Editar cantidad:
                <input type="number" value={nuevaCantidad} onChange={handleCantidadChange} />
            </label>
            <button type="submit">Guardar</button>
           
        </form>
    );
    
} 
