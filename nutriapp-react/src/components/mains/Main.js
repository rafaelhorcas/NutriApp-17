import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ToastContainer, toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';

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
  const [objetivoCalorias, setObjetivoCalorias] = useState(2400);
  const [CaloriasConsumidas, setCaloriasConsumidas] = useState(0);

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

  //Calculo de caloriasConsumidas
  useEffect(() => {
    const caloriasConsumidas = alimentos.reduce((totalKcal, alimento) => {
      return totalKcal + alimento.alimento.calorias;
    }, 0);
    setCaloriasConsumidas(caloriasConsumidas);
  }, [alimentos]);

  // Notificación de objetivo conseguido
  useEffect(() => {
    const objetivoCumplido = () => toast.success('Felicidades!! Has cumplido tu meta diaria de calorías', {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored ",
      });;
    const objetivoNoCumplido = () => toast.error('Vaya... Todavía no has alcanzado tu meta de calorías diarias', {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored ",
      });;
    if (CaloriasConsumidas >= objetivoCalorias) {
      objetivoCumplido();
    } else if (CaloriasRestantes > 0) {
      objetivoNoCumplido();
    }
    }, [ objetivoCalorias]);
  

  // Funcion que cambia el estado del checkbox
  const handleClick = () => {
    setActivo(!activo); // Cambia el estado de activo a su valor opuesto
  };

  //Funciones para sumar los valores nutricionales
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div id='chart-header'>
        <h3>Resumen {activo ? ` semanal del ${formatDate(fechaMenosSieteDate)} al ${formatDate(fechaActualDate)}` : ` diario del ${props.fecha}`}</h3>
      </div>
      <div className='chart-content'>
        <div className="chart">
          <Pie data={data} options={options}/>
        </div>
        <div className="text">
          <div className='form-column'>
            <Form>
              <Form.Check type="switch" id="interruptor" label="Diario/Semanal" checked={activo} onChange={handleClick}/>
              <Form.Range  value={objetivoCalorias} onChange={(e) => setObjetivoCalorias(parseInt(e.target.value))} min={1000} max={5000} step={100} />
              <p>Objetivo de calorías: {objetivoCalorias} kcal</p>
            </Form>
          </div>
          <div className='metrics-column'>
            <p>Calorías consumidas: {CaloriasConsumidas} kcal</p>
            <p>Proteínas: {sumaProteinasTotales} g</p>
            <p>Carbohidratos: {sumaCarbohidratosTotales} g</p>
            <p>Grasas: {sumaGrasasTotales} g</p>
          </div>
        </div>
      </div>
    </div>
  );
};