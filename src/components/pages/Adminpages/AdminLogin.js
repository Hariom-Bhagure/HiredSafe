import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/admin', {
        username,
        password,
      });
  
      if (response.data.success) {
        // Redirect to the admin dashboard
        navigate('/admindashboard');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f4f4f4' }}
    >
      <Card className="p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#333' }}>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3"> 
              <Form.Label htmlFor="username" style={{ color: '#287094', fontWeight: 'bold' }}>
                Username
              </Form.Label>
              <Form.Control
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password" style={{ color: '#287094', fontWeight: 'bold' }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: '#287094',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '16px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#1d5e75')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#287094')}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
