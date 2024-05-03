import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';

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
  //Variables de estado
  const [alimentos, setAlimentos] = useState([]);
  const [activo, setActivo] = useState(false);
  const [objetivoCalorias, setObjetivoCalorias] = useState();
  const [CaloriasConsumidas, setCaloriasConsumidas] = useState();
  const [inputObjetivoCalorias, setInputObjetivoCalorias] = useState(); 

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

  // Notificaciones de objetivo de calorias diarias
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
    if (objetivoCalorias != 0){
      if (CaloriasConsumidas >= objetivoCalorias) {
        console.log(CaloriasConsumidas, "caso cumplido");
        objetivoCumplido();
      } else if (CaloriasRestantes > 0) {
        console.log(CaloriasConsumidas, "caso no cumplido");
        objetivoNoCumplido();
      }
    }
  }, [objetivoCalorias, CaloriasConsumidas]);
  
  // Funcion que cambia el objetivo de calorias
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setObjetivoCalorias(inputObjetivoCalorias);
  };

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

  // Calculamos el objetivo del gráfico dependiendo de si estamos viendo los datos de forma diaria o semanal
  const objetivoGrafico = !activo ? objetivoCalorias : objetivoCalorias * 7;

  //Fuente de datos del gráfico
  const data = {
    labels: ['Ingeridas', 'Restantes'],
    datasets: [{
      data: CaloriasConsumidas > objetivoGrafico ? [objetivoGrafico, 0] : [CaloriasConsumidas, objetivoGrafico - CaloriasConsumidas],
      backgroundColor: ['#14984A', '#757A76'],
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
      <div className='seccion-header'>
        <h1>Resumen {activo ? ` semanal del ${formatDate(fechaMenosSieteDate)} al ${formatDate(fechaActualDate)}` : ` diario del ${props.fecha}`}</h1>
      </div>
      <div className='chart-content'>
        <div className="chart">
          <Pie data={data} options={options}/>
        </div>
        <div className="text">
          <div className='form-column'>
            <Form onSubmit={handleSubmit} >
              <Form.Check type="switch" id="interruptor" label="Diario/Semanal" checked={activo} onChange={handleClick}/>
              <Form.Range value={inputObjetivoCalorias} onChange={(e) => setInputObjetivoCalorias(parseInt(e.target.value))} min={1000} max={5000} step={100} />
              <p>Objetivo de calorías: {inputObjetivoCalorias} kcal</p>
              <Button variant="success" type="submit">Establecer</Button>
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