import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#667eea' }}>
          Certificate Verification System
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '2rem' }}>
          Verify and download your internship certificates securely
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/search" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            🔍 Search Certificate
          </Link>
          
          {user && user.role === 'admin' && (
            <Link to="/admin/dashboard" className="btn btn-success" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              📊 Admin Dashboard
            </Link>
          )}
          
          {!user ? (
            <>
              <Link to="/register" className="btn btn-success" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                ✨ Create Account
              </Link>
              <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                🔐 Login
              </Link>
            </>
          ) : user.role !== 'admin' && (
            <span className="btn" style={{ fontSize: '1.2rem', padding: '1rem 2rem', backgroundColor: '#e0e7ff', color: '#4c51bf', cursor: 'default' }}>
              👋 Welcome, {user.name}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>Features</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Quick Search</h3>
            <p style={{ color: '#6c757d' }}>
              Search certificates instantly using your unique certificate ID
            </p>
          </div>
          
          <div className="stat-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Verification</h3>
            <p style={{ color: '#6c757d' }}>
              Verify the authenticity of certificates in real-time
            </p>
          </div>
          
          <div className="stat-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <h3 style={{ marginBottom: '0.5rem' }}>PDF Download</h3>
            <p style={{ color: '#6c757d' }}>
              Download your certificate as a professional PDF
            </p>
          </div>
          
          <div className="stat-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Secure</h3>
            <p style={{ color: '#6c757d' }}>
              All data is encrypted and securely stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
