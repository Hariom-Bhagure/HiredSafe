import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar1 = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm py-2">
      <Container>
        <Navbar.Brand href="/" className="text-primary" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Hired<span className="text-success">Safe</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto flex-grow-1">
            <FormControl
              type="text"
              placeholder="Search Companies Or Scams"
              className="mr-sm-2 w-50"
            />
          </Form>
          <Nav className="">
            <Nav.Link href="/" className="mr-3">Home</Nav.Link>
            <Nav.Link href="/blog-details" className="active mr-5">Blog</Nav.Link>
            <Nav.Link href="/about" className="mr-5">About</Nav.Link>
            <Nav.Link href="/contact" className="mr-3">Contact</Nav.Link>
            <Button href="/reportscam" className="btn btn-primary">Report Scam</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
