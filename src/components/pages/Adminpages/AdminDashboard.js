import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Nav, Form, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reports/${id}/verify`);
      setReports(reports.map(report => report._id === id ? { ...report, status: 'Verified' } : report));
    } catch (error) {
      console.error('Error verifying report:', error);
    }
  };

  const handlePublish = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reports/${id}/publish`);
      
      if (response.status === 200) {
        // Update the state only if the API call is successful
        setReports((prevReports) => {
          const updatedReports = prevReports.map(report =>
            report._id === id ? { ...report, status: 'Published' } : report
          );
          console.log("The published report is", updatedReports.find(report => report._id === id));
          return updatedReports;
        });
  
        // Emit custom event to notify the Home component
        const event = new Event('reportPublished');
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Error publishing report:', error);
    }
  };
  
  

  const handleView = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  return (
    <div>
      <header className="header border-bottom shadow-sm py-3" style={{ backgroundColor: '#ffffff' }}>
        <Container className="d-flex align-items-center justify-content-between">
          <h1 className="logo" style={{ fontSize: '24px', fontWeight: 'bold', color: '#287094' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#287094' }}>
              Hired<span style={{ color: '#4caf50' }}>Safe</span>
            </a>
          </h1>
          <div className="search-bar" style={{ flexGrow: 1, margin: '0 20px' }}>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search Companies Or Scams"
                className="mr-sm-2 w-100"
                style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </Form>
          </div>
          <Nav className="d-flex gap-3">
            <Nav.Link href="/write-blog" className="dashboard-btn text-white bg-primary" style={buttonStyle}>Write Blog</Nav.Link>
            <Nav.Link href="/admin-msg" className="dashboard-btn text-white bg-primary" style={buttonStyle}>Message</Nav.Link>
          </Nav>
        </Container>
      </header>

      <main className="dashboard-container" style={{ padding: '40px 0', backgroundColor: '#f4f4f4' }}>
        <Container>
          <section className="reports-summary mb-4">
            <Row className="justify-content-around">
              <Col md={3} className="summary-box" style={summaryBoxStyle}>
                <h3 style={summaryHeadingStyle}>Pending Reports</h3>
                <p style={summaryCountStyle}>{reports.filter(report => report.status === 'Pending').length}</p>
              </Col>
              <Col md={3} className="summary-box" style={summaryBoxStyle}>
                <h3 style={summaryHeadingStyle}>Verified Reports</h3>
                <p style={summaryCountStyle}>{reports.filter(report => report.status === 'Verified').length}</p>
              </Col>
              <Col md={3} className="summary-box" style={summaryBoxStyle}>
                <h3 style={summaryHeadingStyle}>Published Reports</h3>
                <p style={summaryCountStyle}>{reports.filter(report => report.status === 'Published').length}</p>
              </Col>
            </Row>
          </section>

          <section className="reports-table">
            <Table striped bordered hover responsive>
              <thead>
                <tr style={{ backgroundColor: '#287094', color: '#ffffff' }}>
                  <th>ID</th>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report._id}>
                    <td>{report._id}</td>
                    <td>{report.companyName}</td>
                    <td>{new Date(report.dateOfScam).toLocaleDateString()}</td>
                    <td>
                      <span className="status" style={statusStyle(report.status)}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {report.status !== 'Verified' && (
                          <Button className="action-btn verify" style={verifyButtonStyle} onClick={() => handleVerify(report._id)}>Verify</Button>
                        )}
                        {report.status === 'Verified' && (
                          <Button className="action-btn publish" style={publishButtonStyle} onClick={() => handlePublish(report._id)}>Publish</Button>
                        )}
                        <Button className="action-btn view" style={viewButtonStyle} onClick={() => handleView(report)}>View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Report Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedReport && (
                <div>
                  <p><strong>ID:</strong> {selectedReport._id}</p>
                  <p><strong>Company Name:</strong> {selectedReport.companyName}</p>
                  <p><strong>Company Address:</strong> {selectedReport.companyAddress}</p>
                  <p><strong>Industry:</strong> {selectedReport.industry}</p>
                  <p><strong>Date of Scam:</strong> {new Date(selectedReport.dateOfScam).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {selectedReport.description}</p>
                  <p><strong>Reporter Name:</strong> {selectedReport.reporterName}</p>
                  <p><strong>Reporter Email:</strong> {selectedReport.reporterEmail}</p>
                  {selectedReport.evidence && (
                    <div>
                      <strong>Evidence:</strong>
                      <img src={`http://localhost:5000/uploads/${selectedReport.evidence}`} alt="evidence" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                  )}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </main>
    </div>
  );
};

const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  textDecoration: 'none',
  transition: 'background-color 0.3s'
};

const summaryBoxStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%',
  marginBottom: '20px'
};

const summaryHeadingStyle = {
  fontSize: '18px',
  color: '#287094',
  marginBottom: '10px'
};

const summaryCountStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333'
};

const statusStyle = (status) => ({
  padding: '5px 10px',
  borderRadius: '4px',
  fontSize: '14px',
  backgroundColor: status === 'Pending' ? '#ffcc00' : status === 'Verified' ? '#2196f3' : '#4caf50',
  color: '#fff'
});

const verifyButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '5px',
  backgroundColor: '#4caf50',
  color: '#fff',
  transition: 'background-color 0.3s'
};

const publishButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#287094',
  color: '#fff',
  transition: 'background-color 0.3s'
};

const viewButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#2196f3',
  color: '#fff',
  transition: 'background-color 0.3s'
};

export default AdminDashboard;
