import React from 'react';
import { Container, Row, Col, Form, FormControl, Nav, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogDetails = () => {
  return (
    <div>
      {/* Main Content */}
      <main>
        {/* Blog Introduction Section */}
        <section className="blog-intro py-5" style={{ backgroundColor: '#e0f7fa' }}>
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="blog-intro-content">
                  <h2 style={{ fontSize: '36px', color: '#287094', marginBottom: '20px' }}>
                    Empower Your Job Search with Knowledge and Insights
                  </h2>
                  <p style={{ marginBottom: '20px', color: '#333' }}>
                    Welcome to the HiredSafe Blog, your trusted resource for navigating the job market with confidence and security. Here, we provide expert tips, in-depth articles, and real-life stories to help you identify and avoid job scams, understand industry trends, and make informed career decisions. Whether you're a fresh graduate stepping into the workforce or an experienced professional seeking new opportunities, our blog is dedicated to empowering you with the knowledge and tools you need to stay ahead in the ever-evolving job market. Stay safe, stay informed, and embark on your search with HiredSafe by your side.
                  </p>
                  <a href="write-blog.html" className="button" style={buttonStyle}>Write Blog</a>
                </div>
              </Col>
              <Col md={6} className="text-center">
                <div className="blog-intro-image">
                  <img src="./Assets/Rectangle 17.png" alt="Blog Introduction Image" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Blog Posts Section */}
        <section className="blog-posts-section py-5" style={{ backgroundColor: '#287094' }}>
          <Container>
            <h3 style={{ marginBottom: '20px', color: '#ffffff', textAlign: 'center' }}>Recent Blog Posts</h3>
            <Row>
              {Array.from({ length: 4 }).map((_, index) => (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <Card className="post h-100" style={postStyle}>
                    <div className="post-image" style={postImageStyle}>
                      <Card.Img variant="top" src="https://demo.tiny.pictures/main/example6.jpg" alt="Blog Image" />
                    </div>
                    <Card.Body>
                      <Card.Text className="author" style={authorStyle}>Samruddhi Published today</Card.Text>
                      <Card.Title as="h4" style={postTitleStyle}>How to Spot Fake Job Posting</Card.Title>
                      <Card.Text style={postTextStyle}>
                        Learn the red flags to watch out for when searching for legitimate job opportunities.
                      </Card.Text>
                      <a href="blog-details.html" className="read-more" style={readMoreStyle}>Read more</a>
                    </Card.Body>
                    <Card.Footer>
                      <div className="post-icons" style={postIconsStyle}>
                        <span>❤</span>
                        <span>💬</span>
                        <span>🔗</span>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
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

export default BlogDetails;

// Inline styles
const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#287094',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  textAlign: 'center'
};

const postStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const postImageStyle = {
  width: '100%',
  height: '150px',
  overflow: 'hidden',
  marginBottom: '15px'
};

const authorStyle = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '10px'
};

const postTitleStyle = {
  fontSize: '18px',
  marginBottom: '10px',
  color: '#287094'
};

const postTextStyle = {
  marginBottom: '15px',
  color: '#333'
};

const readMoreStyle = {
  color: '#287094',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'color 0.3s'
};

const postIconsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
  color: '#287094'
};
