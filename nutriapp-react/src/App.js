import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1 className="app-name">NutriApp</h1>
      </div>
      <div className="buttons">
        <button className="button">Botón 1</button>
        <button className="button">Botón 2</button>
        <button className="button">Botón 3</button>
        <button className="button">Botón 4</button>
      </div>
      <div className="chart">
        {/* Aquí irá la gráfica */}
        <p>Espacio para la gráfica</p>
      </div>
    </div>
  );
}

export default App;
