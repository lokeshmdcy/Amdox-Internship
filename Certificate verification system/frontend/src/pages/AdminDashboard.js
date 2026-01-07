import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardStats();
    fetchCertificates();
  }, [page, searchTerm]);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Stats error:', error);
      // Set default empty stats instead of showing error
      setStats({
        totalCertificates: 0,
        activeCertificates: 0,
        totalUsers: 0,
        recentCertificates: [],
        domainStats: []
      });
      toast.error('Error fetching statistics - showing defaults');
    }
  };

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/certificates?page=${page}&limit=10&search=${searchTerm}`);
      setCertificates(response.data.data.certificates);
      setTotalPages(response.data.data.pagination.pages);
    } catch (error) {
      console.error('Certificates error:', error);
      setCertificates([]);
      setTotalPages(1);
      toast.error('Error fetching certificates - showing empty list');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setUploading(true);
    try {
      const response = await api.post('/admin/certificates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadResult(response.data.data);
      toast.success(`Successfully uploaded ${response.data.data.successCount} certificates`);
      setSelectedFile(null);
      fetchDashboardStats();
      fetchCertificates();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return;
    }

    try {
      await api.delete(`/admin/certificates/${id}`);
      toast.success('Certificate deleted successfully');
      fetchCertificates();
      fetchDashboardStats();
    } catch (error) {
      toast.error('Error deleting certificate');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!stats) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: 'white' }}>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>📊 Admin Dashboard</h1>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalCertificates || 0}</div>
          <div className="stat-label">Total Certificates</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.activeCertificates || 0}</div>
          <div className="stat-label">Active Certificates</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalUsers || 0}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.recentCertificates?.length || 0}</div>
          <div className="stat-label">Recent Uploads</div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="card">
        <div className="card-header">📤 Upload Certificates (Excel/CSV)</div>
        
        <div className="form-group">
          <label className="form-label">Select Excel or CSV File</label>
          <input
            type="file"
            className="form-control"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
          />
          <small className="form-text">
            Upload an Excel (.xlsx, .xls) or CSV file with columns: certificateId, studentName, internshipDomain, startDate, endDate, grade (optional)
          </small>
        </div>

        <button
          onClick={handleUpload}
          className="btn btn-primary"
          disabled={!selectedFile || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {uploadResult && (
          <div style={{ marginTop: '1rem' }}>
            <div className="alert alert-info">
              <strong>Upload Results:</strong>
              <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                <li>Total Records: {uploadResult.totalRecords}</li>
                <li style={{ color: '#28a745' }}>Success: {uploadResult.successCount}</li>
                <li style={{ color: '#dc3545' }}>Failed: {uploadResult.failedCount}</li>
                <li style={{ color: '#ffc107' }}>Duplicates: {uploadResult.duplicateCount}</li>
              </ul>
            </div>

            {uploadResult.results.failed.length > 0 && (
              <details style={{ marginTop: '1rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  View Failed Records ({uploadResult.results.failed.length})
                </summary>
                <div style={{ marginTop: '0.5rem', maxHeight: '200px', overflow: 'auto' }}>
                  {uploadResult.results.failed.map((item, index) => (
                    <div key={index} style={{ padding: '0.5rem', borderBottom: '1px solid #e0e0e0' }}>
                      Row {item.row}: {item.reason}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Certificates List */}
      <div className="card">
        <div className="card-header">📋 All Certificates</div>
        
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by certificate ID or student name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : certificates.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6c757d', padding: '2rem' }}>
            No certificates found
          </p>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Certificate ID</th>
                    <th>Student Name</th>
                    <th>Domain</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Document</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr key={cert._id}>
                      <td><strong>{cert.certificateId}</strong></td>
                      <td>{cert.studentName}</td>
                      <td>{cert.internshipDomain}</td>
                      <td>{cert.duration}</td>
                      <td>
                        <span className={`badge badge-${cert.status === 'active' ? 'success' : 'warning'}`}>
                          {cert.status}
                        </span>
                      </td>
                      <td>
                        {cert.documentPath ? (
                          <a 
                            href={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${cert.documentPath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            📄 View
                          </a>
                        ) : (
                          <span className="text-gray-400">No document</span>
                        )}
                      </td>
                      <td>{formatDate(cert.createdAt)}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(cert._id)}
                          className="btn btn-danger"
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span style={{ padding: '0.5rem 1rem' }}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Domain Statistics */}
      {stats.domainStats && stats.domainStats.length > 0 && (
        <div className="card">
          <div className="card-header">📊 Top Internship Domains</div>
          <table className="table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {stats.domainStats.map((domain, index) => (
                <tr key={index}>
                  <td>{domain._id}</td>
                  <td><strong>{domain.count}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
