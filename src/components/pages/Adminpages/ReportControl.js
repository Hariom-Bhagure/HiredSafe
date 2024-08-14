import React, { useMemo } from 'react';
import { Table, Button, Modal, Row, Col } from 'react-bootstrap';

const ReportControl = ({ reports, handleVerify, handlePublish, handleView, showModal, selectedReport, handleCloseModal }) => {
  // Calculate counts using useMemo to optimize performance
  const counts = useMemo(() => {
    const pending = reports.filter(report => report.status === 'Pending').length;
    const verified = reports.filter(report => report.status === 'Verified').length;
    const published = reports.filter(report => report.status === 'Published').length;
    return { pending, verified, published };
  }, [reports]);

  return (
    <div>
      <h2>Report Control</h2>

      {/* Display the counts */}
      <Row className="mb-4">
        <Col>
          <div style={summaryBoxStyle}>
            <h4 style={summaryHeadingStyle}>Pending Reports</h4>
            <p style={summaryCountStyle}>{counts.pending}</p>
          </div>
        </Col>
        <Col>
          <div style={summaryBoxStyle}>
            <h4 style={summaryHeadingStyle}>Verified Reports</h4>
            <p style={summaryCountStyle}>{counts.verified}</p>
          </div>
        </Col>
        <Col>
          <div style={summaryBoxStyle}>
            <h4 style={summaryHeadingStyle}>Published Reports</h4>
            <p style={summaryCountStyle}>{counts.published}</p>
          </div>
        </Col>
      </Row>

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
                    <Button 
                      variant="success" 
                      onClick={() => handleVerify(report._id)}
                    >
                      Verify
                    </Button>
                  )}
                  {report.status === 'Verified' && (
                    <Button 
                      variant="primary" 
                      onClick={() => handlePublish(report._id)}
                    >
                      Publish
                    </Button>
                  )}
                  <Button 
                    variant="info" 
                    onClick={() => handleView(report)}
                  >
                    View
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to show report details */}
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
    </div>
  );
};

// Styles for the status badge
const statusStyle = (status) => ({
  padding: '5px 10px',
  borderRadius: '4px',
  fontSize: '14px',
  backgroundColor: status === 'Pending' ? '#ffcc00' : status === 'Verified' ? '#2196f3' : '#4caf50',
  color: '#fff'
});

// Styles for the summary boxes
const summaryBoxStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
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

export default ReportControl;
