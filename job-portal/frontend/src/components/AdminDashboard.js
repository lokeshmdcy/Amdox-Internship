import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'jobs') fetchJobs();
    else if (activeTab === 'applications') fetchApplications();
  }, [activeTab, currentPage]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert('Access denied. Admin privileges required.');
        navigate('/login');
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/admin/users?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/admin/jobs?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/admin/applications?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      fetchDashboardStats();
      alert('User deleted successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting user');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchJobs();
      fetchDashboardStats();
      alert('Job deleted successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting job');
    }
  };

  const updateJobStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/jobs/${id}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchJobs();
      fetchDashboardStats();
      alert('Job status updated');
    } catch (error) {
      alert('Error updating job status');
    }
  };

  const openCreateModal = (type) => {
    setModalMode('create');
    setEditingItem(null);
    if (type === 'user') {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'jobseeker',
        phone: ''
      });
    } else if (type === 'job') {
      setFormData({
        title: '',
        description: '',
        qualifications: '',
        responsibilities: '',
        jobType: 'full-time',
        location: '',
        salaryMin: '',
        salaryMax: '',
        companyName: ''
      });
    }
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (activeTab === 'users') {
        if (modalMode === 'create') {
          await axios.post('http://localhost:5000/api/auth/register', formData);
          alert('User created successfully');
        } else {
          await axios.put(`http://localhost:5000/api/admin/users/${editingItem.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert('User updated successfully');
        }
        fetchUsers();
      } else if (activeTab === 'jobs') {
        if (modalMode === 'create') {
          await axios.post('http://localhost:5000/api/jobs', formData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert('Job created successfully');
        } else {
          await axios.put(`http://localhost:5000/api/jobs/${editingItem.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert('Job updated successfully');
        }
        fetchJobs();
      }
      fetchDashboardStats();
      closeModal();
    } catch (error) {
      alert(error.response?.data?.message || `Error ${modalMode}ing item`);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h1>🛡️ Admin Dashboard</h1>
          <p>Manage your job portal</p>
        </div>
      </div>

      <div className="container admin-content">
        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button 
            className={activeTab === 'overview' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={activeTab === 'users' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => { setActiveTab('users'); setCurrentPage(1); }}
          >
            👥 Users
          </button>
          <button 
            className={activeTab === 'jobs' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => { setActiveTab('jobs'); setCurrentPage(1); }}
          >
            💼 Jobs
          </button>
          <button 
            className={activeTab === 'applications' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => { setActiveTab('applications'); setCurrentPage(1); }}
          >
            📝 Applications
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-details">
                  <h3>{stats.stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-details">
                  <h3>{stats.stats.totalJobs}</h3>
                  <p>Total Jobs</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-details">
                  <h3>{stats.stats.totalApplications}</h3>
                  <p>Total Applications</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-details">
                  <h3>{stats.stats.activeJobs}</h3>
                  <p>Active Jobs</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔍</div>
                <div className="stat-details">
                  <h3>{stats.stats.jobSeekers}</h3>
                  <p>Job Seekers</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏢</div>
                <div className="stat-details">
                  <h3>{stats.stats.employers}</h3>
                  <p>Employers</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <div className="activity-section">
                <h3>Recent Users</h3>
                <div className="activity-list">
                  {stats.recentUsers.map(user => (
                    <div key={user.id} className="activity-item">
                      <div>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                      </div>
                      <span className={`badge badge-${user.role}`}>{user.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="activity-section">
                <h3>Recent Jobs</h3>
                <div className="activity-list">
                  {stats.recentJobs.map(job => (
                    <div key={job.id} className="activity-item">
                      <div>
                        <strong>{job.title}</strong>
                        <p>{job.companyName}</p>
                      </div>
                      <span className={`badge badge-${job.status}`}>{job.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-tab">
            <div className="tab-header">
              <h2>User Management</h2>
              <button className="btn-create" onClick={() => openCreateModal('user')}>
                ➕ Create User
              </button>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className={`badge badge-${user.role}`}>{user.role}</span></td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit"
                            onClick={() => openEditModal(user)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => deleteUser(user.id)}
                            disabled={user.role === 'admin'}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab">
            <div className="tab-header">
              <h2>Job Management</h2>
              <button className="btn-create" onClick={() => openCreateModal('job')}>
                ➕ Create Job
              </button>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{job.companyName}</td>
                      <td>{job.location}</td>
                      <td><span className="badge">{job.jobType}</span></td>
                      <td>
                        <select 
                          value={job.status}
                          onChange={(e) => updateJobStatus(job.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit"
                            onClick={() => openEditModal(job)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => deleteJob(job.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-tab">
            <h2>Application Management</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Applicant</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>
                        <div>
                          <strong>{app.User?.name}</strong>
                          <br />
                          <small>{app.User?.email}</small>
                        </div>
                      </td>
                      <td>{app.Job?.title}</td>
                      <td>{app.Job?.companyName}</td>
                      <td><span className={`badge badge-${app.status}`}>{app.status}</span></td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalMode === 'create' ? '➕ Create' : '✏️ Edit'} {activeTab === 'users' ? 'User' : 'Job'}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              {activeTab === 'users' && (
                <>
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  {modalMode === 'create' && (
                    <div className="form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password || ''}
                        onChange={handleFormChange}
                        required
                        minLength="6"
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Role *</label>
                    <select
                      name="role"
                      value={formData.role || 'jobseeker'}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="jobseeker">Job Seeker</option>
                      <option value="employer">Employer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                </>
              )}

              {activeTab === 'jobs' && (
                <>
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Type *</label>
                      <select
                        name="jobType"
                        value={formData.jobType || 'full-time'}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Min Salary *</label>
                      <input
                        type="number"
                        name="salaryMin"
                        value={formData.salaryMin || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Max Salary *</label>
                      <input
                        type="number"
                        name="salaryMax"
                        value={formData.salaryMax || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      rows="4"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Qualifications *</label>
                    <textarea
                      name="qualifications"
                      value={formData.qualifications || ''}
                      onChange={handleFormChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Responsibilities *</label>
                    <textarea
                      name="responsibilities"
                      value={formData.responsibilities || ''}
                      onChange={handleFormChange}
                      rows="3"
                      required
                    />
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {modalMode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
