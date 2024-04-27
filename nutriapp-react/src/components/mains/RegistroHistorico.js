import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Chart from 'chart.js/auto';

export default function RegistroHistorico(props){

    const [alimentos, setAlimentos] = useState([]);

    //Peticion API REST
    useEffect(() => {
        const obtenerAlimentos = async () => {
          try {
            let url = `http://localhost:8080/registroHistorico/${props.usuario.email}`;

            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Error al obtener alimentos');
            }
            const data = await response.json();
            setAlimentos(data);
            generarGrafica(data);
          } catch (error) {
            console.error('Error al obtener alimentos:', error);
          }
        };
    
        obtenerAlimentos();
      }, [props.usuario.email]);

     // Función para generar la gráfica de barras
    const generarGrafica = (data) => {
        const alimentosConsumidos = {};
        data.forEach(registro => {
            const nombreAlimento = registro.alimento.nombre;
            if (alimentosConsumidos[nombreAlimento]) {
                alimentosConsumidos[nombreAlimento] += registro.cantidad;
            } else {
                alimentosConsumidos[nombreAlimento] = registro.cantidad;
            }
        });

        const ctx = document.getElementById('graficaAlimentos');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(alimentosConsumidos),
                datasets: [{
                    label: 'Cantidad Consumida',
                    data: Object.values(alimentosConsumidos),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

      return(
        <div className='main'>
            <h1>Registro de Comidas</h1>
            <div className='botones'>
            <Button variant="success" href="/registroalimentos">Volver</Button>  
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
