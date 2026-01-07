import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function JobList({ user }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const jobsPerPage = 9;
  
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: [],
    minSalary: '',
    maxSalary: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [currentPage, sortBy]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.keyword) queryParams.append('keyword', filters.keyword);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.jobType.length > 0) queryParams.append('jobType', filters.jobType.join(','));
      if (filters.minSalary) queryParams.append('minSalary', filters.minSalary);
      if (filters.maxSalary) queryParams.append('maxSalary', filters.maxSalary);

      const response = await api.get(`/jobs?${queryParams}`);
      let sortedJobs = response.data.data;
      
      // Client-side sorting
      if (sortBy === 'recent') {
        sortedJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === 'salary-high') {
        sortedJobs.sort((a, b) => b.salaryMax - a.salaryMax);
      } else if (sortBy === 'salary-low') {
        sortedJobs.sort((a, b) => a.salaryMin - b.salaryMin);
      }
      
      setTotalJobs(sortedJobs.length);
      
      // Pagination
      const startIndex = (currentPage - 1) * jobsPerPage;
      const paginatedJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);
      
      setJobs(paginatedJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  const handleJobTypeToggle = (type) => {
    const newJobTypes = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type];
    setFilters({ ...filters, jobType: newJobTypes });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs();
  };
  
  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: [],
      minSalary: '',
      maxSalary: ''
    });
    setCurrentPage(1);
  };
  
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  
  const getJobTypeColor = (type) => {
    const colors = {
      'full-time': '#3b82f6',
      'part-time': '#8b5cf6',
      'contract': '#f59e0b',
      'internship': '#10b981',
      'remote': '#ec4899'
    };
    return colors[type] || '#6b7280';
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="skeleton-loader">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="container">
          <h1>Find Your Dream Job</h1>
          <p>Explore {totalJobs} opportunities waiting for you</p>
        </div>
      </div>
      
      <div className="container jobs-container">
        <aside className="filters-sidebar">
          <div className="filter-section">
            <div className="filter-header">
              <h3>Filters</h3>
              {(filters.keyword || filters.location || filters.jobType.length > 0 || filters.minSalary || filters.maxSalary) && (
                <button onClick={clearFilters} className="clear-filters">Clear All</button>
              )}
            </div>
            
            <form onSubmit={handleSearch}>
              <div className="filter-group">
                <label>🔍 Keyword</label>
                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  placeholder="Job title, skills..."
                />
              </div>

              <div className="filter-group">
                <label>📍 Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City, state..."
                />
              </div>

              <div className="filter-group">
                <label>💼 Job Type</label>
                <div className="checkbox-group">
                  {['full-time', 'part-time', 'contract', 'internship', 'remote'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleJobTypeToggle(type)}
                      />
                      <span>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>💰 Salary Range</label>
                <div className="salary-inputs">
                  <input
                    type="number"
                    name="minSalary"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                    placeholder="Min"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="maxSalary"
                    value={filters.maxSalary}
                    onChange={handleFilterChange}
                    placeholder="Max"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary search-btn">
                Search Jobs
              </button>
            </form>
          </div>
        </aside>

        <main className="jobs-main">
          <div className="jobs-controls">
            <div className="jobs-count">
              <strong>{totalJobs}</strong> jobs found
            </div>
            
            <div className="jobs-actions">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="recent">Most Recent</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
              </select>
              
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''} 
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  ⊞
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''} 
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="skeleton-loader">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your filters or search criteria</p>
              <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className={`jobs-grid ${viewMode}`}>
                {jobs.map(job => (
                  <div key={job.id} className="job-card fade-in">
                    <div className="job-card-header">
                      <div className="company-logo">
                        {job.User?.companyName?.charAt(0) || 'C'}
                      </div>
                      <div className="job-title-section">
                        <h3>{job.title}</h3>
                        <p className="company-name">{job.User?.companyName || 'Company'}</p>
                      </div>
                    </div>
                    
                    <div className="job-meta">
                      <span className="job-location">📍 {job.location}</span>
                      <span 
                        className="job-type-badge" 
                        style={{ backgroundColor: getJobTypeColor(job.jobType) }}
                      >
                        {job.jobType}
                      </span>
                    </div>

                    <p className="job-description">
                      {job.description.substring(0, 120)}...
                    </p>

                    <div className="job-card-footer">
                      <div className="job-salary">
                        💵 ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                      </div>
                      <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-primary">
                        View Details →
                      </Link>
                    </div>
                    
                    <div className="job-posted">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="pagination-dots">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default JobList;
