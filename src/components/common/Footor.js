import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-4 border-top">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="text-primary">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-success text-decoration-none">About us</a></li>
              <li><a href="#" className="text-success text-decoration-none">Pricing</a></li>
              <li><a href="#" className="text-success text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-success text-decoration-none">Terms & Conditions</a></li>
              <li><a href="#" className="text-success text-decoration-none">Refund Policy</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="text-primary">Solutions</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-success text-decoration-none">Product</a></li>
              <li><a href="#" className="text-success text-decoration-none">Brands & Businesses</a></li>
              <li><a href="#" className="text-success text-decoration-none">Agencies</a></li>
              <li><a href="#" className="text-success text-decoration-none">Creators & Freelancers</a></li>
              <li><a href="#" className="text-success text-decoration-none">Case Studies</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="text-primary">Community</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-success text-decoration-none">Discussion Forum</a></li>
              <li><a href="#" className="text-success text-decoration-none">Converters & Optimizer</a></li>
              <li><a href="#" className="text-success text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-success text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-success text-decoration-none">Contact Us</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12} className="text-center">
            <p className="text-muted mb-0">&copy; 2024 HiredSafe. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
