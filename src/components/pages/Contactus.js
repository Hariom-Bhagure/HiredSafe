import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      console.log(res.data);
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <main>
        <section className="contact-section py-5" style={{ textAlign: 'center' }}>
          <Container>
            <h2 style={{ fontSize: '28px', color: '#287094', marginBottom: '10px' }}>Connect with Us:</h2>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
              Your Safety and Satisfaction Are Our Top Priorities.
            </p>
            <Form className="contact-form mx-auto" style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
              <Form.Group className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <Form.Label htmlFor="name" style={{ fontWeight: 'bold', color: '#287094' }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.phone}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', resize: 'vertical', minHeight: '100px' }}
                />
              </Form.Group>
              <Button type="submit" className="submit-btn w-100" style={{ padding: '10px', backgroundColor: '#287094', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', transition: 'background-color 0.3s' }}>Send Message</Button>
            </Form>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Contact;
