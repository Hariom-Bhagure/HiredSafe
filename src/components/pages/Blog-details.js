import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Blog_Hero from "../assets/bloghero.jpg"
import blog_thumbnail from "../assets/Report_Hero.jpg"

const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('There was an error fetching the blogs:', error);
      }
    };

    fetchBlogs();
  }, []); 

  // Group blogs into rows of three
  const blogRows = [];
  for (let i = 0; i < blogs.length; i += 3) {
    blogRows.push(blogs.slice(i, i + 3));
  }

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
                  <a href="/createblog" className="button" style={buttonStyle}>Write Blog</a>
                </div>
              </Col>
              <Col md={6} className="text-center">
                <div className="blog-intro-image">
                  <img src={Blog_Hero} alt="Blog Introduction Image" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Blog Posts Section */}
        <section className="blog-posts-section py-5" style={{ backgroundColor: '#287094' }}>
          <Container>
            <h3 style={{ marginBottom: '20px', color: '#ffffff', textAlign: 'center' }}>Recent Blog Posts</h3>
            {blogRows.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((blog, index) => (
                  <Col md={6} lg={4} key={index} className="mb-4">
                    <Card className="post h-100" style={postStyle}>
                      <div className="post-image" style={postImageStyle}>
                        <Card.Img variant="top" src={blog_thumbnail} alt="Blog Image" />
                      </div>
                      <Card.Body>
                        <Card.Text className="author" style={authorStyle}>
                          {blog.name} Published on {new Date(blog.date).toLocaleDateString()}
                        </Card.Text>
                        <Card.Title as="h4" style={postTitleStyle}>{blog.title}</Card.Title>
                        <Card.Text style={postTextStyle}>
                          {blog.description.substring(0, 100)}... {/* Show only the first 100 characters */}
                        </Card.Text>
                        <a href={`/blog-details/${blog._id}`} className="read-more" style={readMoreStyle}>Read more</a>
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
            ))}
          </Container>
        </section>
      </main>
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
  height: '326px',
  overflow: 'hidden',
  marginBottom: '1px'
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
