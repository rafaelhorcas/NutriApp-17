import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { mock_alimentos_dia } from '../../constants/alimentos_dia';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

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

export default function Main(){

  const [alimentos, setAlimentos] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [email, setEmail] = useState('');

  useEffect(() => {
    const obtenerAlimentos = async () => {
        try {
            const response = await fetch(`/api/alimentosPorUsuarioYFecha?email=${email}&fecha=${fecha}`);
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
  }, [email, fecha]); 

    const objetivoCalorias = 2400;
    const CaloriasConsumidas = mock_alimentos_dia.alimentos_dia.reduce((totalKcal, alimento) => {
      return totalKcal + alimento.kcal_totales;
    }, 0);
    const CaloriasRestantes = objetivoCalorias - CaloriasConsumidas;

    const sumaProteinasTotales = mock_alimentos_dia.alimentos_dia.reduce((totalProteinas, alimento) => {
      return totalProteinas + alimento.proteinas_totales;
    }, 0);

    const sumaCarbohidratosTotales = mock_alimentos_dia.alimentos_dia.reduce((totalCarbohidratos, alimento) => {
      return totalCarbohidratos + alimento.carbohidratos_totales;
    }, 0);

    const sumaGrasasTotales = mock_alimentos_dia.alimentos_dia.reduce((totalGrasas, alimento) => {
      return totalGrasas + alimento.grasas_totales;
    }, 0);

    const data = {
        labels: ['Ingeridas','Restantes'],
        datasets: [{
          data: [CaloriasConsumidas, CaloriasRestantes],
          backgroundColor: ['#1bca63', '#757A76'],
        }],
      };

    return (
        <div className='main'>
          <div id='chart-header'>
            <h3>Resumen diario</h3>
          </div>
          {console.log(fecha)}
          <div className='chart-content'>
            <div className="chart">
              <Pie data={data} options={options}/>
            </div>
            <div className="text">
              <p>Objetivo de calorías: {objetivoCalorias} kcal</p>
              <p>Calorías consumidas: {CaloriasConsumidas} kcal</p>
              <p>Proteinas: {sumaProteinasTotales} g</p>
              <p>Carbohidratos: {sumaCarbohidratosTotales} g</p>
              <p>Grasas: {sumaGrasasTotales} g</p>
            </div>
          </div>
      </div>
    );
}