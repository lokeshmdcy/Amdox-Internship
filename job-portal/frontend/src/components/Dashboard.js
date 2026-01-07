import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    accepted: 0,
    rejected: 0
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      if (user.role === 'employer') {
        // Fetch employer's jobs
        const jobsResponse = await api.get('/jobs/employer/me');
        setJobs(jobsResponse.data.data);
        
        // Fetch applications received
        const appsResponse = await api.get('/applications/received');
        const apps = appsResponse.data.data;
        setApplications(apps);
        
        // Calculate status counts
        const statusCounts = {
          pending: apps.filter(a => a.status === 'pending').length,
          reviewed: apps.filter(a => a.status === 'reviewed').length,
          shortlisted: apps.filter(a => a.status === 'shortlisted').length,
          accepted: apps.filter(a => a.status === 'accepted').length,
          rejected: apps.filter(a => a.status === 'rejected').length
        };
        
        setStats({
          totalJobs: jobsResponse.data.count,
          totalApplications: appsResponse.data.count,
          ...statusCounts
        });
        
        // Recent activity
        const recent = apps.slice(0, 5).map(app => ({
          type: 'application',
          message: `${app.jobSeeker.name} applied for ${app.job.title}`,
          date: app.appliedAt
        }));
        setRecentActivity(recent);
      } else {
        // Fetch job seeker's applications
        const appsResponse = await api.get('/applications/my-applications');
        const apps = appsResponse.data.data;
        setApplications(apps);
        
        // Calculate status counts
        const statusCounts = {
          pending: apps.filter(a => a.status === 'pending').length,
          reviewed: apps.filter(a => a.status === 'reviewed').length,
          shortlisted: apps.filter(a => a.status === 'shortlisted').length,
          accepted: apps.filter(a => a.status === 'accepted').length,
          rejected: apps.filter(a => a.status === 'rejected').length
        };
        
        setStats({
          totalApplications: appsResponse.data.count,
          ...statusCounts
        });
        
        // Recent activity
        const recent = apps.slice(0, 5).map(app => ({
          type: 'application',
          message: `Applied for ${app.job.title}`,
          date: app.appliedAt,
          status: app.status
        }));
        setRecentActivity(recent);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        fetchDashboardData();
      } catch (error) {
        alert('Failed to delete job');
      }
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });
      fetchDashboardData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="skeleton-loader">
          {[1, 2, 3].map(i => (
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
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p className="dashboard-subtitle">
              {user.role === 'employer' 
                ? 'Manage your job postings and track applications' 
                : 'Track your applications and find new opportunities'}
            </p>
          </div>
          {user.role === 'employer' && (
            <Link to="/create-job" className="btn btn-primary">
              ➕ Post New Job
            </Link>
          )}
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {user.role === 'employer' ? (
            <>
              <div className="stat-card stat-primary">
                <div className="stat-icon">💼</div>
                <div className="stat-content">
                  <h3>{stats.totalJobs}</h3>
                  <p>Active Jobs</p>
                </div>
              </div>
              <div className="stat-card stat-info">
                <div className="stat-icon">📨</div>
                <div className="stat-content">
                  <h3>{stats.totalApplications}</h3>
                  <p>Total Applications</p>
                </div>
              </div>
              <div className="stat-card stat-warning">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{stats.pending}</h3>
                  <p>Pending Review</p>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{stats.shortlisted}</h3>
                  <p>Shortlisted</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card stat-primary">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <h3>{stats.totalApplications}</h3>
                  <p>Applications</p>
                </div>
              </div>
              <div className="stat-card stat-warning">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{stats.pending + stats.reviewed}</h3>
                  <p>In Progress</p>
                </div>
              </div>
              <div className="stat-card stat-info">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <h3>{stats.shortlisted}</h3>
                  <p>Shortlisted</p>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">🎉</div>
                <div className="stat-content">
                  <h3>{stats.accepted}</h3>
                  <p>Accepted</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-grid">
          {/* Applications Chart */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Application Status</h3>
            </div>
            <div className="chart-container">
              <div className="status-chart">
                {[
                  { label: 'Pending', count: stats.pending, color: '#f59e0b' },
                  { label: 'Reviewed', count: stats.reviewed, color: '#3b82f6' },
                  { label: 'Shortlisted', count: stats.shortlisted, color: '#8b5cf6' },
                  { label: 'Accepted', count: stats.accepted, color: '#10b981' },
                  { label: 'Rejected', count: stats.rejected, color: '#ef4444' }
                ].map(item => (
                  <div key={item.label} className="status-bar-item">
                    <div className="status-bar-label">
                      <span>{item.label}</span>
                      <strong>{item.count}</strong>
                    </div>
                    <div className="status-bar">
                      <div 
                        className="status-bar-fill" 
                        style={{ 
                          width: `${stats.totalApplications ? (item.count / stats.totalApplications) * 100 : 0}%`,
                          backgroundColor: item.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-timeline">
              {recentActivity.length === 0 ? (
                <p className="empty-state">No recent activity</p>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p>{activity.message}</p>
                      <span className="activity-date">
                        {new Date(activity.date).toLocaleDateString()} • {new Date(activity.date).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Jobs/Applications Table */}
        {user.role === 'employer' ? (
          <>
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Your Job Postings</h3>
                <Link to="/create-job" className="btn btn-sm btn-primary">
                  + Add New
                </Link>
              </div>
              {jobs.length === 0 ? (
                <div className="empty-state">
                  <p>You haven't posted any jobs yet.</p>
                  <Link to="/create-job" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Post Your First Job
                  </Link>
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Applications</th>
                        <th>Posted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map(job => (
                        <tr key={job.id}>
                          <td>
                            <Link to={`/jobs/${job.id}`} className="job-title-link">
                              {job.title}
                            </Link>
                          </td>
                          <td>{job.location}</td>
                          <td>
                            <span className="type-badge">{job.jobType}</span>
                          </td>
                          <td>
                            {applications.filter(app => app.job?.id === job.id).length}
                          </td>
                          <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <Link 
                                to={`/jobs/${job.id}`}
                                className="btn-icon btn-primary" 
                                title="View/Edit job"
                              >
                                👁️
                              </Link>
                              <button 
                                className="btn-icon btn-danger" 
                                onClick={() => handleDeleteJob(job.id)}
                                title="Delete job"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3>Recent Applications</h3>
              </div>
              {applications.length === 0 ? (
                <p className="empty-state">No applications received yet.</p>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Job</th>
                        <th>Applied</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.slice(0, 10).map(app => (
                        <tr key={app.id}>
                          <td>
                            <div className="candidate-info">
                              <strong>{app.jobSeeker?.name}</strong>
                              <small>{app.jobSeeker?.email}</small>
                            </div>
                          </td>
                          <td>{app.job?.title}</td>
                          <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge status-${app.status}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <select 
                              value={app.status} 
                              onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Your Applications</h3>
              <Link to="/jobs" className="btn btn-sm btn-primary">
                Browse Jobs
              </Link>
            </div>
            {applications.length === 0 ? (
              <div className="empty-state">
                <p>You haven't applied to any jobs yet.</p>
                <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Explore Job Listings
                </Link>
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>
                          <Link to={`/jobs/${app.job?.id}`} className="job-title-link">
                            {app.job?.title}
                          </Link>
                        </td>
                        <td>{app.job?.User?.companyName || 'Company'}</td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge status-${app.status}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          <Link to={`/jobs/${app.job?.id}`} className="btn btn-sm">
                            View Job
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
