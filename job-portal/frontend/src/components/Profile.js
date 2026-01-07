import React, { useState, useEffect } from 'react';
import api from '../api';

function Profile({ user }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    skills: [],
    education: '',
    experience: '',
    companyName: '',
    companyDescription: '',
    companyWebsite: ''
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const defaultAvatars = [
    'https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=200',
    'https://ui-avatars.com/api/?name=Happy&background=f97316&color=fff&size=200&bold=true',
    'https://ui-avatars.com/api/?name=Star&background=10b981&color=fff&size=200&bold=true',
    'https://ui-avatars.com/api/?name=Pro&background=3b82f6&color=fff&size=200&bold=true',
    'https://ui-avatars.com/api/?name=Cool&background=8b5cf6&color=fff&size=200&bold=true',
    'https://ui-avatars.com/api/?name=Boss&background=ec4899&color=fff&size=200&bold=true',
    'https://ui-avatars.com/api/?name=King&background=eab308&color=fff&size=200&bold=true',
    'https://ui-avatars.com/api/?name=Dev&background=14b8a6&color=fff&size=200&bold=true'
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'skills') {
      setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) });
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile', profile);
      setMessage('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      await api.post('/profile/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Resume uploaded successfully!');
      setSelectedFile(null);
      fetchProfile();
    } catch (error) {
      setMessage('Failed to upload resume');
    }
  };

  const handleAvatarSelect = async (avatarUrl) => {
    try {
      await api.put('/profile', { ...profile, avatar: avatarUrl });
      setProfile({ ...profile, avatar: avatarUrl });
      setMessage('Avatar updated successfully!');
      setShowAvatarPicker(false);
      fetchProfile();
    } catch (error) {
      setMessage('Failed to update avatar');
    }
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="form-container" style={{ maxWidth: '700px' }}>
        <h2>My Profile</h2>
        
        {message && <div className="success-message">{message}</div>}

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <img 
              src={profile.avatar || 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=200'} 
              alt="Profile Avatar" 
              className="profile-avatar"
            />
            <button 
              className="btn btn-outline btn-small"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              style={{ marginTop: '1rem' }}
            >
              {showAvatarPicker ? 'Close Avatar Picker' : 'Change Avatar'}
            </button>
          </div>

          {showAvatarPicker && (
            <div className="avatar-picker">
              <h4>Select an Avatar</h4>
              <div className="avatar-grid">
                {defaultAvatars.map((avatarUrl, index) => (
                  <div 
                    key={index} 
                    className={`avatar-option ${profile.avatar === avatarUrl ? 'selected' : ''}`}
                    onClick={() => handleAvatarSelect(avatarUrl)}
                  >
                    <img src={avatarUrl} alt={`Avatar ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
              />
            </div>

            {user.role === 'jobseeker' && (
              <>
                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={profile.skills?.join(', ') || ''}
                    onChange={handleChange}
                    placeholder="JavaScript, React, Node.js"
                  />
                </div>
                
                <div className="form-group">
                  <label>Education</label>
                  <textarea
                    name="education"
                    value={profile.education || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Experience</label>
                  <textarea
                    name="experience"
                    value={profile.experience || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {user.role === 'employer' && (
              <>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Company Description</label>
                  <textarea
                    name="companyDescription"
                    value={profile.companyDescription || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={profile.companyWebsite || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            
            <button type="submit" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Save Changes
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
              
              {user.role === 'jobseeker' && (
                <>
                  <p><strong>Skills:</strong> {profile.skills?.join(', ') || 'None listed'}</p>
                  <p><strong>Education:</strong> {profile.education || 'Not provided'}</p>
                  <p><strong>Experience:</strong> {profile.experience || 'Not provided'}</p>
                  <p><strong>Resume:</strong> {profile.resume ? 'Uploaded' : 'Not uploaded'}</p>
                </>
              )}
              
              {user.role === 'employer' && (
                <>
                  <p><strong>Company:</strong> {profile.companyName || 'Not provided'}</p>
                  <p><strong>Description:</strong> {profile.companyDescription || 'Not provided'}</p>
                  <p><strong>Website:</strong> {profile.companyWebsite || 'Not provided'}</p>
                </>
              )}
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}

        {user.role === 'jobseeker' && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
            <h3>Upload Resume</h3>
            <form onSubmit={handleResumeUpload}>
              <div className="form-group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Upload Resume
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
