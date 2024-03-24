import { Col } from 'react-bootstrap';
import '../App.css'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Anuncios</h2>
      <p>¡Descubre nuestras ofertas especiales!</p>
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Anuncio 1</h5>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Anuncio 2</h5>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
