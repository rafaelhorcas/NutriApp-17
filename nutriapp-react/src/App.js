import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/mains/Main';
import Sidebar from './components/Sidebar';
import Title from './components/Title';

import { Row, Col, Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import RegistroAlimento from './components/mains/RegistroAlimento';

export default function App() {
  return (
    <Container fluid>
      <Title/>
      <Header/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/registro" element={<RegistroAlimento/>} />
      </Routes>
      <Footer/>
    </Container>
  );
}