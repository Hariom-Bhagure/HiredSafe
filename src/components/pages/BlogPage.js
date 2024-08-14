import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const BlogPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    title: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost:5000/api/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Blog submitted successfully');
    } catch (error) {
      console.error('There was an error submitting the blog:', error);
    }
  };

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="index.html">
              <span style={{ color: '#287094' }}>Hired</span>
              <span style={{ color: '#4caf50' }}>Safe</span>
            </Navbar.Brand>
            <Form inline className="ml-auto">
              <FormControl type="text" placeholder="Search Companies Or Scams" className="mr-sm-2" />
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="index.html">Home</Nav.Link>
                <Nav.Link href="blog.html" className="active">Blog</Nav.Link>
                <Nav.Link href="about.html">About</Nav.Link>
                <Nav.Link href="contact.html">Contact</Nav.Link>
                <Nav.Link href="ReportScams.html" className="btn btn-success">Report Scam</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <section className="blog-form-section">
          <Container>
            <h2>Write a Blog</h2>
            <Form className="blog-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group controlId="your-name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="your-email">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="company-name">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter the company name involved in report (if have any)" name="companyName" value={formData.companyName} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="blog-title">
                <Form.Label>Title of The Blog</Form.Label>
                <Form.Control type="text" placeholder="Enter the title of the blog" name="title" value={formData.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="blog-description">
                <Form.Label>Description of Blog</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Provide detailed description of the blog" name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="upload">
                <Form.Label>Upload</Form.Label>
                <Form.Control type="file" name="file" onChange={handleFileChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="submit-btn">
                Submit Blog
              </Button>
            </Form>
          </Container>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
