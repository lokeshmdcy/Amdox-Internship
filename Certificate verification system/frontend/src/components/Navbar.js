import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎓 Certificate Verification
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/search" className="nav-link">Search Certificate</Link>
          </li>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/admin/upload-document" className="nav-link">Upload Document</Link>
                  </li>
                </>
              )}
              <li>
                <span className="nav-link">Welcome, {user.name}</span>
              </li>
              <li>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-primary">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
