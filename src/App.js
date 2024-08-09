import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contactus from './components/pages/Contactus';
import ReportScam from './components/pages/ReportScam';
import Navbar1 from './components/common/Navbar'; // Assuming you have a Navbar component
import BlogDetails from './components/pages/Blog-details';
import AdminDashboard from './components/pages/Adminpages/AdminDashboard';

function App() {
  return (
    <Router>
      <div>
        <Navbar1 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/reportscam" element={<ReportScam />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
