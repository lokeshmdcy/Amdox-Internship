import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>Job Portal</h1>
        <nav>
          <Link to="/">Jobs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              {user.role === 'employer' && (
                <Link to="/create-job">Post Job</Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin">Admin Panel</Link>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
