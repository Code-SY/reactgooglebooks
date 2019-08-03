import React from "react";
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = () => (
  <footer className="mt-4">
    <Container>
      <hr />
      <p>
        <FontAwesomeIcon icon={['fab', 'react']} /> 
      </p>
    </Container>
  </footer>
);

export default Footer;
