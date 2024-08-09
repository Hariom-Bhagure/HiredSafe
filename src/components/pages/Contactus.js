import React from 'react';
import { Container, Row, Col, Form, FormControl, Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  return (
    <div>
      {/* Main Content */}
      <main>
        {/* Contact Section */}
        <section className="contact-section py-5" style={{ textAlign: 'center' }}>
          <Container>
            <h2 style={{ fontSize: '28px', color: '#287094', marginBottom: '10px' }}>Connect with Us:</h2>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
              Your Safety and Satisfaction Are Our Top Priorities.
            </p>
            <Form className="contact-form mx-auto" style={{ maxWidth: '600px' }}>
              <Form.Group className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <Form.Label htmlFor="name" style={{ fontWeight: 'bold', color: '#287094' }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </Form.Group>
              <Form.Group className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <Form.Label htmlFor="email" style={{ fontWeight: 'bold', color: '#287094' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </Form.Group>
              <Form.Group className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <Form.Label htmlFor="phone" style={{ fontWeight: 'bold', color: '#287094' }}>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </Form.Group>
              <Form.Group className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <Form.Label htmlFor="message" style={{ fontWeight: 'bold', color: '#287094' }}>How can we help</Form.Label>
                <Form.Control
                  as="textarea"
                  id="message"
                  placeholder="Tell us your problem"
                  required
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', resize: 'vertical', minHeight: '100px' }}
                />
              </Form.Group>
              <Button type="submit" className="submit-btn w-100" style={{ padding: '10px', backgroundColor: '#287094', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', transition: 'background-color 0.3s' }}>Send Message</Button>
            </Form>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-5" style={{ backgroundColor: '#333', color: '#fff' }}>
        <Container>
          <Row className="footer-content">
            <Col md={4} className="footer-section">
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li><a href="#" style={{ color: '#ccc' }}>About us</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Pricing</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Terms & Conditions</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Refund Policy</a></li>
              </ul>
            </Col>
            <Col md={4} className="footer-section">
              <h5>Solutions</h5>
              <ul className="list-unstyled">
                <li><a href="#" style={{ color: '#ccc' }}>Product</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Brands & Businesses</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Agencies</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Creators & Freelancers</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Case Studies</a></li>
              </ul>
            </Col>
            <Col md={4} className="footer-section">
              <h5>Community</h5>
              <ul className="list-unstyled">
                <li><a href="#" style={{ color: '#ccc' }}>Discussion Forum</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Converters & Optimizer</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Blog</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Careers</a></li>
                <li><a href="#" style={{ color: '#ccc' }}>Contact Us</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Contact;
