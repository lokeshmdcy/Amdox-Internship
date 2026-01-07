import React, { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const SearchCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!certificateId.trim()) {
      toast.error('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError('');
    setCertificate(null);

    try {
      const response = await api.get(`/certificates/search/${certificateId.trim()}`);
      setCertificate(response.data.data.certificate);
      toast.success('Certificate found!');
    } catch (err) {
      setError(err.response?.data?.message || 'Certificate not found');
      toast.error(err.response?.data?.message || 'Certificate not found');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/certificates/download/${certificate.certificateId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificate.certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Certificate downloaded successfully!');
    } catch (err) {
      toast.error('Error downloading certificate');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">🔍 Search Certificate</div>
        
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label className="form-label">Certificate ID</label>
            <input
              type="text"
              className="form-control"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
              placeholder="Enter your certificate ID (e.g., CERT2024001)"
              style={{ textTransform: 'uppercase' }}
            />
            <small className="form-text">Enter your unique certificate ID to search</small>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search Certificate'}
          </button>
        </form>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {certificate && (
        <div className="card">
          <div className="card-header">Certificate Details</div>
          
          <div style={{ padding: '1rem 0' }}>
            <table className="table">
              <tbody>
                <tr>
                  <th style={{ width: '200px' }}>Certificate ID</th>
                  <td>
                    <strong>{certificate.certificateId}</strong>
                    <span className="badge badge-success" style={{ marginLeft: '1rem' }}>
                      {certificate.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Student Name</th>
                  <td>{certificate.studentName}</td>
                </tr>
                <tr>
                  <th>Internship Domain</th>
                  <td>{certificate.internshipDomain}</td>
                </tr>
                <tr>
                  <th>Start Date</th>
                  <td>{formatDate(certificate.startDate)}</td>
                </tr>
                <tr>
                  <th>End Date</th>
                  <td>{formatDate(certificate.endDate)}</td>
                </tr>
                <tr>
                  <th>Duration</th>
                  <td>{certificate.duration}</td>
                </tr>
                <tr>
                  <th>Grade</th>
                  <td>{certificate.grade}</td>
                </tr>
                <tr>
                  <th>Issue Date</th>
                  <td>{formatDate(certificate.issuedDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleDownload} className="btn btn-success">
              📄 Download Certificate PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCertificate;
