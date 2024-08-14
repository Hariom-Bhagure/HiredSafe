import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const BlogControl = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <div>
      <h2>Blog Control</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr style={{ backgroundColor: '#287094', color: '#ffffff' }}>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.title}</td>
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={() => handleView(blog)}>View</Button>
                  <Button variant="danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <div>
              <p><strong>ID:</strong> {selectedBlog._id}</p>
              <p><strong>Title:</strong> {selectedBlog.title}</p>
              <p><strong>Description:</strong> {selectedBlog.description}</p>
              <p><strong>Date:</strong> {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
              {selectedBlog.fileUrl && (
                <div>
                  <strong>Image:</strong>
                  <img src={selectedBlog.fileUrl} alt="blog" style={{ maxWidth: '100%', height: 'auto' }} />
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

export default BlogControl;
