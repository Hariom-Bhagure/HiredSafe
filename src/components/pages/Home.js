import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Home_Hero from "../assets/Home_Hero.jpg"

const Home = () => {
  const [publishedReports, setPublishedReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports');
      const published = response.data.filter(report => report.status === 'Published');
      setPublishedReports(published);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
    const handleReportPublished = () => fetchReports();
    window.addEventListener('reportPublished', handleReportPublished);
    return () => window.removeEventListener('reportPublished', handleReportPublished);
  }, []);

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className="hero py-5" style={{ backgroundColor: '#f4f4f9' }}>
          <Container className="hero-container">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="hero-content">
                  <h2 style={{ color: '#287094' }}>Protect Yourself From Job Scams</h2>
                  <p>Our platform helps you identify and avoid job scams, protecting your personal and financial information.</p>
                  <Button href="/report-scams" className="button" style={{ backgroundColor: '#287094', borderColor: '#287094' }}>
                    Report Scam
                  </Button>
                </div>
              </Col>
              <Col md={6} className="text-center">
                <Image
                  src={Home_Hero  }
                  alt="Protect Yourself From Job Scams"
                  fluid
                  style={{ maxWidth: '100%' }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Latest Scams Section */}
        <section className="latest-scams py-5">
          <Container>
            <h3 className="mb-4" style={{ color: '#287094' }}>Latest Reported Scams</h3>
            <Row className="scams">
              {publishedReports.map((report) => (
                <Col md={6} className="mb-4" key={report._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="post-image">
                        <Image src={report.evidence} alt="Blog Image" fluid />
                      </div>
                      <Card.Text className="author">{report.reporterName}</Card.Text>
                      <Card.Title>Company Name: {report.companyName}</Card.Title>
                      <Card.Text>
                        {report.description.length > 150 ? `${report.description.substring(0, 150)}...` : report.description}
                      </Card.Text>
                      <Link to={`/reportdetails/${report._id}`} className="read-more">Read More</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {publishedReports.length === 0 && (
                <Col>
                  <p>No published reports available at this time.</p>
                </Col>
              )}
            </Row>
          </Container>
        </section>

        {/* Blog Section */}
        <section className="blog py-5" style={{ backgroundColor: '#287094' }}>
          <Container>
            <h3 className="mb-4 text-white">From the Blog</h3>
            <Row className="blog-posts">
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <div className="post-image">
                    <Image src="https://demo.tiny.pictures/main/example6.jpg" alt="Blog Image" fluid />
                  </div>
                  <Card.Body>
                    <Card.Text className="author">Samruddhi</Card.Text>
                    <Card.Text className="date">Published today</Card.Text>
                    <Card.Title>How to Spot Fake Job Posting</Card.Title>
                    <Card.Text>
                      Learn the red flags to watch out for when searching for legitimate job opportunities.
                    </Card.Text>
                    <Link to="#" className="read-more">Read more</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <div className="post-image">
                    <Image
                      src="https://demo.tiny.pictures/main/example6.jpg"
                      alt="Blog Image"
                      fluid
                    />
                  </div>
                  <Card.Body>
                    <Card.Text className="author">Samruddhi</Card.Text>
                    <Card.Text className="date">Published today</Card.Text>
                    <Card.Title>How to Spot Fake Job Posting</Card.Title>
                    <Card.Text>
                      Learn the red flags to watch out for when searching for legitimate job opportunities.
                    </Card.Text>
                    <Link to="#" className="read-more">Read more</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <div className="post-image">
                    <Image
                      src="https://demo.tiny.pictures/main/example6.jpg"
                      alt="Blog Image"
                      fluid
                    />
                  </div>
                  <Card.Body>
                    <Card.Text className="author">Samruddhi</Card.Text>
                    <Card.Text className="date">Published today</Card.Text>
                    <Card.Title>How to Spot Fake Job Posting</Card.Title>
                    <Card.Text>
                      Learn the red flags to watch out for when searching for legitimate job opportunities.
                    </Card.Text>
                    <Link to="#" className="read-more">Read more</Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Home;
