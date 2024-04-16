import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { mock_alimentos_dia } from '../../constants/alimentos_dia';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

ChartJS.register(ArcElement, Tooltip, Legend);

// Opciones visuales del gráfico
const options = {
  plugins: {
    legend:{
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.label || '';
          if (label) {
            label += ': kcal ';
          }
          label += context.formattedValue;
          return label;
        }
      }
    },
  }
}

export default function Main(props){

  const [alimentos, setAlimentos] = useState([]);
  const [activo, setActivo] = useState(false);

  //Peticiones API REST segun el ckeckbox
  useEffect(() => {
    const obtenerAlimentos = async () => {
      try {
        let url = `http://localhost:8080/registroDiario/${props.usuario.email}?fecha=${props.fecha}`;
        if (activo) {
          // Obtener los registros semanales
          url = `http://localhost:8080/registroSemanal/${props.usuario.email}?fecha=${props.fecha}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener alimentos');
        }
        const data = await response.json();
        setAlimentos(data);
      } catch (error) {
        console.error('Error al obtener alimentos:', error);
      }
    };

    obtenerAlimentos();
  }, [props.usuario.email, props.fecha, activo]);

  // Funcion que cambia el estado del checkbox
  const handleClick = () => {
    setActivo(!activo); // Cambia el estado de activo a su valor opuesto
  };

  //Funciones para sumar los valores nutricionales
  const objetivoCalorias = 2400;
  const CaloriasConsumidas = alimentos.reduce((totalKcal, alimento) => {
    return totalKcal + alimento.alimento.calorias;
  }, 0);
  const CaloriasRestantes = objetivoCalorias - CaloriasConsumidas;

  const sumaProteinasTotales = alimentos.reduce((totalProteinas, alimento) => {
    return totalProteinas + alimento.alimento.proteinas;
  }, 0);

  const sumaCarbohidratosTotales = alimentos.reduce((totalCarbohidratos, alimento) => {
    return totalCarbohidratos + alimento.alimento.carbohidratos;
  }, 0);

  const sumaGrasasTotales = alimentos.reduce((totalGrasas, alimento) => {
    return totalGrasas + alimento.alimento.grasas;
  }, 0);

  //Fuente de datos del gráfico
  const data = {
    labels: ['Ingeridas', 'Restantes'],
    datasets: [{
      data: CaloriasConsumidas > objetivoCalorias ? [objetivoCalorias, 0] : [CaloriasConsumidas, CaloriasRestantes],
      backgroundColor: ['#1bca63', '#757A76'],
    }],
  };

  // Calcular fecha inicio 7 días
  const fechaActualDate = new Date(
    props.fecha.split("-").reverse().join("-")
  );
  const fechaMenosSieteDate = new Date(fechaActualDate);
  fechaMenosSieteDate.setDate(fechaActualDate.getDate() - 7);
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  return (
    <div className='main'>
      <div id='chart-header'>
        <h3>Resumen {activo ? ` semanal del ${formatDate(fechaMenosSieteDate)} al ${formatDate(fechaActualDate)}` : ` diario del ${props.fecha}`}</h3>
      </div>
      <div className='chart-content'>
        <div className="chart">
          <Pie data={data} options={options}/>
        </div>
        <div className="text">
        <Form>
          <Form.Check type="switch" id="interruptor" label="Diario/Semanal" checked={activo} onChange={handleClick}/>
        </Form>
          <p>Objetivo de calorías: {objetivoCalorias} kcal</p>
          <p>Calorías consumidas: {CaloriasConsumidas} kcal</p>
          <p>Proteínas: {sumaProteinasTotales} g</p>
          <p>Carbohidratos: {sumaCarbohidratosTotales} g</p>
          <p>Grasas: {sumaGrasasTotales} g</p>
        </div>
      </div>
    </div>
  );
};