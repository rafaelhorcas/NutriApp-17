import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'; //npm install react-apexcharts

export default function Habitos(props){

    const [alimentos, setAlimentos] = useState([]);

    //Peticiones API REST
    useEffect(() => {
        const obtenerAlimentos = async () => {
          try {
            let url = `http://localhost:8080/registroMensual/${props.usuario.email}?fecha=${props.fecha}`;

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
      }, [props.usuario.email, props.fecha]);

    // Calcular la suma de calorías de cada día
    const sumCaloriasPorDia = alimentos.map((registrosDia) =>
    registrosDia.reduce((totalCalorias, registro) => {
      return totalCalorias + registro.alimento.calorias;
      }, 0)
    );

    // Calcular la suma de proteinas de cada día
    const sumProteinasPorDia = alimentos.map((registrosDia) =>
    registrosDia.reduce((totalProteinas, registro) => {
      return totalProteinas + registro.alimento.proteinas;
      }, 0)
    );

    // Calcular la suma de grasas de cada día
    const sumGrasasPorDia = alimentos.map((registrosDia) =>
    registrosDia.reduce((totalGrasas, registro) => {
      return totalGrasas + registro.alimento.grasas;
      }, 0)
    );

    // Calcular la suma de carbohidratos de cada día
    const sumCarbohidratosPorDia = alimentos.map((registrosDia) =>
    registrosDia.reduce((totalCarbohidratos, registro) => {
      return totalCarbohidratos + registro.alimento.carbohidratos;
      }, 0)
    );

    // Calcular fecha inicio 30 días
    const fechaActualDate = new Date(
      props.fecha.split("-").reverse().join("-")
    );
    const fechaMenosTreintaDate = new Date(fechaActualDate);
    fechaMenosTreintaDate.setDate(fechaActualDate.getDate() - 29);

    // Crear un array con los últimos 30 días
    const ultimosTreintaDias = [];
    let fechaActual = fechaMenosTreintaDate;
    while (fechaActual <= fechaActualDate) {
      ultimosTreintaDias.push(fechaActual.getDate());
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    ultimosTreintaDias.push(fechaActualDate.getDate());
    const mediacalorias = Array(30).fill(2400);
    const mediaproteinas = Array(30).fill(50);
    const mediagrasas = Array(30).fill(50);
    const mediacarbohidratos = Array(30).fill(135);



    const seriescalorias = [
      {
        name: "calorias",
        data: sumCaloriasPorDia
      },
      {
        name: "Recomendado",
        data: mediacalorias
      }
    ];

    const seriesproteinas = [
      {
        name: "proteinas",
        data: sumProteinasPorDia
      },
      {
        name: "Recomendado",
        data: mediaproteinas
      }
    ];

    const seriesgrasas = [
      {
        name: "grasas",
        data: sumGrasasPorDia
      },
      {
        name: "Recomendado",
        data: mediagrasas
      }
    ];

    const seriescarbohidratos = [
      {
        name: "carbohidratos",
        data: sumCarbohidratosPorDia
      },
      {
        name: "Recomendado",
        data: mediacarbohidratos
      }
    ];

    const optionscalorias = {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Calorías en los últimos 30 días',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ultimosTreintaDias,
        title: {
          text: 'Días'
        }
      },
      yaxis: {
        title: {
          text: 'Calorías'
        },
        min: 5,
        max: 3500
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    const optionsproteinas = {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Proteinas en los últimos 30 días',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ultimosTreintaDias,
        title: {
          text: 'Días'
        }
      },
      yaxis: {
        title: {
          text: 'Gramos'
        },
        min: 5,
        max: 80
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    const optionsgrasas = {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Grasas en los últimos 30 días',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ultimosTreintaDias,
        title: {
          text: 'Días'
        }
      },
      yaxis: {
        title: {
          text: 'Gramos'
        },
        min: 5,
        max: 80
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    const optionscarbohidratos = {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Carbohidratos en los últimos 30 días',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ultimosTreintaDias,
        title: {
          text: 'Días'
        }
      },
      yaxis: {
        title: {
          text: 'Gramos'
        },
        min: 5,
        max: 300
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    const [showChat, setShowChat] = useState(false);

    const handleToggleChat = () => {
        setShowChat(!showChat);
    };

    return (
      <div>
        {props.usuario.esPremium ? (
          <div className="text">
            <div>
              <ReactApexChart options={optionscalorias} series={seriescalorias} type="line" height={350} />
              <ReactApexChart options={optionsproteinas} series={seriesproteinas} type="line" height={350} />
              <ReactApexChart options={optionsgrasas} series={seriesgrasas} type="line" height={350} />
              <ReactApexChart options={optionscarbohidratos} series={seriescarbohidratos} type="line" height={350} />
            </div>
            <div className="chat-option">
              <button onClick={handleToggleChat}>Chat con nutricionista</button>
            </div>
            {showChat && <ChatWidget />}
          </div>
        ) : (
          <p>No eres usuario de pago</p>
        )}
      </div>
    );
    
}

function ChatWidget() {
    return (
        <div className="chat-widget">
            <div className="chat-message">
                <p>¡Hola! ¿En qué puedo ayudarte hoy?</p>
            </div>
            <div className="chat-response">
                <p>Se le atenderá en breve.</p>
            </div>
        </div>
    );
    
}
