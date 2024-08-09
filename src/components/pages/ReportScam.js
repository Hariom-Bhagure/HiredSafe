import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportScam = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    industry: '',
    dateOfScam: '',
    description: '',
    evidence: null,
    reporterName: '',
    reporterEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, evidence: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost:5000/api/reports', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(response.data.message);
      setFormData({
        companyName: '',
        companyAddress: '',
        industry: '',
        dateOfScam: '',
        description: '',
        evidence: null,
        reporterName: '',
        reporterEmail: ''
      });
    } catch (error) {
      alert('Error submitting report: ' + error.response.data.message);
    }
  };

  return (
    <div>
      {/* Main Content */}
      <main>
        {/* Report Form Section */}
        <section className="report-form-section py-5">
          <Container>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#287094' }}>Submit a Scam Report</h2>
            <Form className="report-form" style={reportFormStyle} onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={6} className="form-group">
                  <Form.Group controlId="company-name">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the company name involved in the scam"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="form-group">
                  <Form.Group controlId="company-address">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Company Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the company address"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="form-group">
                  <Form.Group controlId="industry">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    >
                      <option value="">Select industry</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6} className="form-group">
                  <Form.Group controlId="date-of-scam">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Date of Scam</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfScam"
                      value={formData.dateOfScam}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="form-group full-width">
                  <Form.Group controlId="description">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Description of Scam</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Provide details about the scam"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="form-group full-width">
                  <Form.Group controlId="evidence">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Upload Evidence</Form.Label>
                    <Form.Control
                      type="file"
                      name="evidence"
                      onChange={handleFileChange}
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="form-group">
                  <Form.Group controlId="your-name">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="reporterName"
                      value={formData.reporterName}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="form-group">
                  <Form.Group controlId="your-email">
                    <Form.Label style={{ marginBottom: '5px', color: '#287094' }}>Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="reporterEmail"
                      value={formData.reporterEmail}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="form-group">
                  <Button type="submit" className="submit-btn w-100" style={submitButtonStyle}>
                    Submit Report
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </section>
      </main>
    </div>
  );
};

// Styles
const reportFormStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px'
};

const submitButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#287094',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
  marginTop: '20px'
};

export default ReportScam;
