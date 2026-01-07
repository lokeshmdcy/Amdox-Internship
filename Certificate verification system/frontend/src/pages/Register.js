import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      toast.success('Registration successful!');
      navigate('/');
    } else {
      toast.error(result.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          {/* Header */}
          <div style={{ backgroundColor: '#10b981', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '1.875rem', fontWeight: 'bold', margin: '0' }}>
              Register
            </h2>
            <p style={{ color: '#d1fae5', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Create your account
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your full name"
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your email"
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Min 6 characters"
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  placeholder="Re-enter password"
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: loading ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#059669')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#10b981')}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
              <span style={{ color: '#6b7280' }}>Already have an account? </span>
              <Link to="/login" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '500' }}>
                Sign in
              </Link>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '6px' }}>
              <p style={{ fontSize: '0.75rem', color: '#065f46', margin: '0' }}>
                <strong>Note:</strong> User accounts can search and verify certificates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
