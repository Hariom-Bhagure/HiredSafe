import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, Modal } from 'react-bootstrap';
import axios from 'axios';
import BlogControl from './BlogControl'; // Import BlogControl component
import ReportControl from './ReportControl'; // Import ReportControl component
import AdminSupport from './AdminSupport'; // Import AdminSupport component
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeComponent, setActiveComponent] = useState('reports'); // State to manage active component

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
        setReports((prevReports) => {
          const updatedReports = prevReports.map(report =>
            report._id === id ? { ...report, status: 'Published' } : report
          );
          console.log("The published report is", updatedReports.find(report => report._id === id));
          return updatedReports;
        });
  
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
    <div className="d-flex">
      <div className="sidebar bg-light p-3" style={{ width: '250px', height: '100vh' }}>
        <Button variant="primary" className="mb-2 w-100" onClick={() => setActiveComponent('reports')}>Report Control</Button>
        <Button variant="primary" className="mb-2 w-100" onClick={() => setActiveComponent('blogs')}>Blog Control</Button>
        <Button variant="primary" className="w-100" onClick={() => setActiveComponent('support')}>Support</Button>
      </div>
      <div className="content p-3" style={{ flexGrow: 1 }}>
        <Container>
          {activeComponent === 'reports' && (
            <ReportControl 
              reports={reports} 
              handleVerify={handleVerify} 
              handlePublish={handlePublish} 
              handleView={handleView} 
              showModal={showModal} 
              selectedReport={selectedReport} 
              handleCloseModal={handleCloseModal}
            />
          )}
          {activeComponent === 'blogs' && <BlogControl />}
          {activeComponent === 'support' && <AdminSupport />} {/* Display AdminSupport component */}
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
