import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CreateJob from './components/CreateJob';
import AdminDashboard from './components/AdminDashboard';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/jobs" element={<JobList user={user} />} />
          <Route 
            path="/login" 
            element={!user ? <Login login={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register login={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="/jobs/:id" element={<JobDetails user={user} />} />
          <Route 
            path="/create-job" 
            element={user && user.role === 'employer' ? <CreateJob /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin" 
            element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
