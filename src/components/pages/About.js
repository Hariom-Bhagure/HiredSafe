import React from 'react';
import { Container, Row, Col, Form, FormControl, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div>
      {/* About Hero Section */}
      <section className="about-hero py-5" style={{ backgroundColor: '#287094', color: '#ffffff', textAlign: 'center' }}>
        <Container>
          <h2 style={{ fontSize: '36px' }}>Our Shield in the Job Market: Ensuring Trust and Safety for Every Job Seeker</h2>
        </Container>
      </section>

      {/* About Content Section */}
      <section className="about-content py-5">
        <Container>
          <h3 style={{ fontSize: '28px', color: '#287094', marginBottom: '20px' }}>About HiredSafe</h3>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
            At HiredSafe, we are dedicated to creating a secure and transparent job market. Our mission is to empower job seekers with the knowledge and tools they need to avoid scams and find legitimate opportunities.
          </p>
          <Row className="about-features mb-4">
            <Col md={6} lg={3} className="feature">
              <h4 style={{ fontSize: '20px', color: '#287094', marginBottom: '10px' }}>Trusted Employers</h4>
              <p style={{ fontSize: '14px', color: '#555' }}>We partner with reputable employers to ensure job listings are legitimate and safe.</p>
            </Col>
            <Col md={6} lg={3} className="feature">
              <h4 style={{ fontSize: '20px', color: '#287094', marginBottom: '10px' }}>Verified Candidates</h4>
              <p style={{ fontSize: '14px', color: '#555' }}>Our thorough vetting process helps job seekers build trust and credibility.</p>
            </Col>
            <Col md={6} lg={3} className="feature">
              <h4 style={{ fontSize: '20px', color: '#287094', marginBottom: '10px' }}>Empowered Job Seekers</h4>
              <p style={{ fontSize: '14px', color: '#555' }}>We provide resources and guidance to help you navigate the job market with confidence.</p>
            </Col>
            <Col md={6} lg={3} className="feature">
              <h4 style={{ fontSize: '20px', color: '#287094', marginBottom: '10px' }}>Secure Platform</h4>
              <p style={{ fontSize: '14px', color: '#555' }}>Our platform is designed with robust security measures to protect your data.</p>
            </Col>
          </Row>
          <p style={{ fontSize: '16px', color: '#555' }}>At HiredSafe, we offer:</p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}>Verified Company Profiles: Gain insights into potential employers with our comprehensive and trusted database.</li>
            <li style={{ marginBottom: '10px' }}>Up-to-Date Scam Alerts: Stay informed about the latest job scams and how to avoid them.</li>
            <li style={{ marginBottom: '10px' }}>Expert Resources: Access valuable articles, guides, and tips to enhance your job search and protect your personal information.</li>
          </ul>
          <img src="./Assets/about.png" alt="About HiredSafe" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '8px' }} />
        </Container>
      </section>

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

export default About;
