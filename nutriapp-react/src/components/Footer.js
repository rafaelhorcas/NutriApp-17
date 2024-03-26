import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer () {
  return (
    <footer className="footer">
      <Container className="py-3 text-center">
        NutriApp
      </Container>
    </footer>
  );
};

