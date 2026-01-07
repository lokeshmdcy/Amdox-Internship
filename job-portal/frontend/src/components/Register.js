import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register({ login }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'jobseeker',
    companyName: '',
    companyDescription: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/register', formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>I am a</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        
        {formData.role === 'employer' && (
          <>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Description</label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Register;
