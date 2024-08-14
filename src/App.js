import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contactus from './components/pages/Contactus';
import ReportScam from './components/pages/ReportScam';
import Navbar1 from './components/common/Navbar'; // Assuming you have a Navbar component
import BlogDetails from './components/pages/Blog-details';
import AdminDashboard from './components/pages/Adminpages/AdminDashboard';
import BlogPage from './components/pages/BlogPage';
import Footer from './components/common/Footor';
import ReportDetails from './components/pages/ReportDetail1';
import AdminLogin from './components/pages/Adminpages/AdminLogin';
import Chat from './components/pages/Adminpages/AdminSupport';

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
          <Route path="/createblog" element={<BlogPage />} />
          <Route path="/reportdetails/:id" element={<ReportDetails/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/admin-msg" element={<Chat/>} />



        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
