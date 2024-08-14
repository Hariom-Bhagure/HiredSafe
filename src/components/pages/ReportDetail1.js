import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Image, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ReportDetails = () => {
  const { id } = useParams(); // Get the report ID from the URL
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reports/${id}`);
        setReport(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Report not found');
        } else {
          setError('An error occurred while fetching the report');
        }
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [id]);

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
        <div className="text-center">
          <Button href="/" variant="primary">
            Back to Reports
          </Button>
        </div>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            {report.evidence && (
              <Card.Img variant="top" src={report.evidence} alt="Evidence" fluid="true" />
            )}
            <Card.Body>
              <Card.Title className="text-primary">{report.companyName}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">Reported by: {report.reporterName}</Card.Subtitle>
              <Card.Text>
                <strong>Industry:</strong> {report.industry}
              </Card.Text>
              <Card.Text>
                <strong>Date of Scam:</strong> {new Date(report.dateOfScam).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {report.description}
              </Card.Text>
              <div className="text-center">
                <Button href="/" variant="primary" className="mt-4">
                  Back to Reports
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDetails;
