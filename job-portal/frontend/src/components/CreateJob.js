import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function CreateJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    qualifications: '',
    responsibilities: '',
    jobType: 'full-time',
    location: '',
    salaryMin: '',
    salaryMax: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        qualifications: formData.qualifications,
        responsibilities: formData.responsibilities,
        jobType: formData.jobType,
        location: formData.location,
        salaryRange: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
          currency: 'USD'
        }
      };

      await api.post('/jobs', jobData);
      setSuccess('Job posted successfully!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '700px', marginTop: '2rem' }}>
      <h2>Post a New Job</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <select name="jobType" value={formData.jobType} onChange={handleChange}>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g., New York, NY"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe the job role and what the candidate will be doing..."
          />
        </div>

        <div className="form-group">
          <label>Qualifications</label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
            placeholder="List the required qualifications, skills, and experience..."
          />
        </div>

        <div className="form-group">
          <label>Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            placeholder="List the key responsibilities of this role..."
          />
        </div>

        <div className="form-group">
          <label>Minimum Salary ($)</label>
          <input
            type="number"
            name="salaryMin"
            value={formData.salaryMin}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g., 50000"
          />
        </div>

        <div className="form-group">
          <label>Maximum Salary ($)</label>
          <input
            type="number"
            name="salaryMax"
            value={formData.salaryMax}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g., 80000"
          />
        </div>

        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
}

export default CreateJob;
