import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Home({ user }) {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setFeaturedJobs(response.data.data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      window.location.href = `/jobs?keyword=${searchKeyword}`;
    } else {
      window.location.href = '/jobs';
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Find your next<br />
                <span className="highlight">career opportunity</span>
              </h1>
              <p className="hero-subtitle">
                Connect with top employers and find the perfect job that matches your skills and experience.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-large btn-deep-blue">Get Started</Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="/images/Job-Portals-for-Hiring.jpg" 
                alt="Best Job Portals for Hiring" 
                className="hero-illustration"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="hero-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for jobs, companies, or keywords..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="search-input-hero"
                />
                <button type="submit" className="btn-search">Search</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <p>Discover the most exciting job opportunities from top companies</p>
          </div>
          
          {loading ? (
            <div className="loading">Loading featured jobs...</div>
          ) : (
            <>
              <div className="jobs-grid">
                {featuredJobs.map(job => (
                  <div key={job.id} className="job-card-featured">
                    <div className="job-card-header">
                      <h3>{job.title}</h3>
                      <p className="company-name">{job.User?.companyName || 'Company'}</p>
                    </div>
                    <div className="job-meta">
                      <span className="job-meta-item">
                        📍 {job.location}
                      </span>
                      <span className="job-meta-item">
                        💼 {job.jobType}
                      </span>
                      <span className="job-meta-item">
                        💰 ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                      </span>
                    </div>
                    <p className="job-description">{job.description.substring(0, 120)}...</p>
                    <Link to={`/jobs/${job.id}`} className="btn btn-outline btn-small">View Details</Link>
                  </div>
                ))}
              </div>
              <div className="section-footer">
                <Link to="/jobs" className="btn btn-primary">View All Jobs</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>FEATURES</h2>
            <h3>A better way to find your next job</h3>
            <p>Our platform is designed to make your job search faster, easier, and more effective.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                🔍
              </div>
              <h4>Find Your Dream Job</h4>
              <p>Access thousands of job listings from top companies around the world.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                📝
              </div>
              <h4>Easy Application</h4>
              <p>Apply to multiple jobs with just a few clicks using your profile.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                🏢
              </div>
              <h4>Company Insights</h4>
              <p>Get valuable insights into company culture and work environment.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                📈
              </div>
              <h4>Career Growth</h4>
              <p>Discover opportunities that match your skills and career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by job seekers and employers worldwide</h2>
            <p>Join thousands of professionals who found their dream job through our platform.</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Jobs Available</p>
            </div>
            <div className="stat-item">
              <h3>2,500+</h3>
              <p>Companies Hiring</p>
            </div>
            <div className="stat-item">
              <h3>500,000+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Success Stories</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
