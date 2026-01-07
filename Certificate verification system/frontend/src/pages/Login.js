import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login successful!');
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      toast.error(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          
          {/* Header */}
          <div style={{ backgroundColor: '#4F46E5', padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '1.875rem', fontWeight: 'bold', margin: '0' }}>
              Login
            </h2>
            <p style={{ color: '#e0e7ff', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border-color 0.15s'
                  }}
                  placeholder="admin@example.com"
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border-color 0.15s'
                  }}
                  placeholder="Enter password"
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: loading ? '#9ca3af' : '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4338ca')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4F46E5')}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Register Link */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
              <span style={{ color: '#6b7280' }}>Don't have an account? </span>
              <Link to="/register" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '500' }}>
                Register
              </Link>
            </div>

            {/* Admin Info */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '6px' }}>
              <p style={{ fontSize: '0.75rem', color: '#1e40af', margin: '0', marginBottom: '0.25rem' }}>
                <strong>Default Admin:</strong>
              </p>
              <p style={{ fontSize: '0.75rem', color: '#3b82f6', margin: '0' }}>
                Email: admin@example.com<br />
                Password: Admin@123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
