import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

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

}
export default function RegistroAlimentos({ usuario, fecha }) {
  const [historialComidas, setHistorialComidas] = useState([]);

  const handleShowHistory = async () => {
    try {
      const response = await fetch(`URL_DE_TU_API_PARA_OBTENER_HISTORIAL_DE_COMIDAS?usuario=${usuario}&fecha=${fecha}`);
      if (!response.ok) {
        throw new Error('Error al obtener historial de comidas');
      }
      const data = await response.json();
      setHistorialComidas(data.historial || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleShowHistory}>Mostrar Historial de Comidas</Button>
      {historialComidas.map((comida, index) => (
        <div key={index}>
          <p>{comida.nombre}</p>
          <p>Calorías: {comida.calorias}</p>
          <p>Proteínas: {comida.proteinas}</p>
          <p>Carbohidratos: {comida.carbohidratos}</p>
          <p>Grasas: {comida.grasas}</p>
        </div>
      ))}
    </div>
  );
}
















    );




