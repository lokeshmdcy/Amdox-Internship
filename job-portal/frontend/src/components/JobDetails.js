import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function JobDetails({ user }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data.data);
      setEditedJob({
        title: response.data.data.title,
        description: response.data.data.description,
        qualifications: response.data.data.qualifications,
        responsibilities: response.data.data.responsibilities,
        location: response.data.data.location,
        jobType: response.data.data.jobType,
        salaryMin: response.data.data.salaryMin,
        salaryMax: response.data.data.salaryMax
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job:', error);
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/applications', {
        jobId: id,
        coverLetter
      });
      setMessage('Application submitted successfully!');
      setCoverLetter('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply');
    }
  };

  const handleEditChange = (e) => {
    setEditedJob({
      ...editedJob,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.put(`/jobs/${id}`, editedJob);
      setJob(response.data.data);
      setMessage('Job updated successfully!');
      setIsEditing(false);
      fetchJobDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
    }
  };

  const handleDeleteJob = async () => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        await api.delete(`/jobs/${id}`);
        setMessage('Job deleted successfully!');
        setTimeout(() => {
          navigate('/jobs');
        }, 1500);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete job');
      }
    }
  };

  const isJobOwner = user && job && user.id === job.employerId;

  if (loading) return <div className="loading">Loading job details...</div>;
  if (!job) return <div className="container">Job not found</div>;

  return (
    <div className="container">
      <div className="job-card" style={{ marginTop: '2rem' }}>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Action buttons for job owner */}
        {isJobOwner && !isEditing && (
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-primary"
              style={{ padding: '8px 16px' }}
            >
              ✏️ Edit Job
            </button>
            <button 
              onClick={handleDeleteJob} 
              className="btn btn-danger"
              style={{ padding: '8px 16px' }}
            >
              🗑️ Delete Job
            </button>
          </div>
        )}

        {/* Edit Mode */}
        {isEditing ? (
          <form onSubmit={handleUpdateJob}>
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={editedJob.title}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={editedJob.location}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Type *</label>
              <select
                name="jobType"
                value={editedJob.jobType}
                onChange={handleEditChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Minimum Salary *</label>
                <input
                  type="number"
                  name="salaryMin"
                  value={editedJob.salaryMin}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Maximum Salary *</label>
                <input
                  type="number"
                  name="salaryMax"
                  value={editedJob.salaryMax}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={editedJob.description}
                onChange={handleEditChange}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>Qualifications *</label>
              <textarea
                name="qualifications"
                value={editedJob.qualifications}
                onChange={handleEditChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Responsibilities *</label>
              <textarea
                name="responsibilities"
                value={editedJob.responsibilities}
                onChange={handleEditChange}
                rows="4"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-success">
                💾 Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="btn btn-secondary"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* View Mode */}
            <h2>{job.title}</h2>
            <h3 className="company-name">{job.companyName}</h3>
            
            <div className="job-info">
              <span>📍 {job.location}</span>
              <span>💼 {job.jobType}</span>
              <span>💰 ${job.salaryMin} - ${job.salaryMax} {job.salaryCurrency || 'USD'}</span>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Job Description</h3>
              <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>{job.description}</p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Qualifications</h3>
              <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>{job.qualifications}</p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Responsibilities</h3>
              <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>{job.responsibilities}</p>
            </div>

            {job.employer && (
              <div style={{ marginTop: '2rem' }}>
                <h3>About the Company</h3>
                <p><strong>Contact:</strong> {job.employer.email}</p>
                {job.employer.companyDescription && (
                  <p style={{ marginTop: '1rem' }}>{job.employer.companyDescription}</p>
                )}
                {job.employer.companyWebsite && (
                  <p><strong>Website:</strong> <a href={job.employer.companyWebsite} target="_blank" rel="noopener noreferrer">{job.employer.companyWebsite}</a></p>
                )}
              </div>
            )}

            {user && user.role === 'jobseeker' && (
              <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
                <h3>Apply for this Job</h3>
                <form onSubmit={handleApply}>
                  <div className="form-group">
                    <label>Cover Letter</label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell the employer why you're a great fit for this role..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success">Submit Application</button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
