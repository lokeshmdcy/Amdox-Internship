import React, { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaUpload, FaFileAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const UploadDocument = () => {
  const [certificateId, setCertificateId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadResult(null);

    // Create preview for images
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!certificateId.trim()) {
      toast.error('Please enter a certificate ID');
      return;
    }

    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    // Validate file size (100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error('File size must be less than 100MB');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('certificateId', certificateId.toUpperCase());

      const response = await api.post('/admin/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadResult(response.data);
      toast.success('Document uploaded successfully!');
      
      // Reset form
      setCertificateId('');
      setSelectedFile(null);
      setPreview(null);
      document.getElementById('fileInput').value = '';
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error uploading document';
      toast.error(errorMessage);
      setUploadResult({ success: false, message: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Header */}
          <div style={{ backgroundColor: '#f97316', padding: '2rem', textAlign: 'center' }}>
            <FaUpload style={{ fontSize: '2.5rem', color: 'white', margin: '0 auto' }} />
            <h1 style={{ color: 'white', fontSize: '1.875rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>
              Upload Certificate Document
            </h1>
          </div>

          {/* Content */}
          <div style={{ padding: '2rem' }}>
          <form onSubmit={handleUpload}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Certificate ID <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                placeholder="Enter Certificate ID (e.g., CERT2024001)"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                disabled={uploading}
                onFocus={(e) => e.target.style.borderColor = '#f97316'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Select Document <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f97316'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}>
                <input
                  id="fileInput"
                  type="file"
                  accept="*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
                <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'block' }}>
                  <FaFileAlt style={{ fontSize: '3rem', color: '#f97316', margin: '0 auto 1rem' }} />
                  <p style={{ color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Click to browse
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    All file formats supported (Max 100MB)
                  </p>
                </label>
              </div>

              {selectedFile && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#ecfdf5', border: '1px solid #86efac', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaCheckCircle style={{ color: '#10b981', fontSize: '1.5rem', marginRight: '0.75rem' }} />
                    <div>
                      <p style={{ fontWeight: '600', color: '#374151', margin: 0 }}>{selectedFile.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                        Size: {formatFileSize(selectedFile.size)} | Type: {selectedFile.type}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {preview && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Preview
                </label>
                <img 
                  src={preview} 
                  alt="Document preview" 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !certificateId || !selectedFile}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: (uploading || !certificateId || !selectedFile) ? '#9ca3af' : '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: (uploading || !certificateId || !selectedFile) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => !(uploading || !certificateId || !selectedFile) && (e.target.style.backgroundColor = '#ea580c')}
              onMouseLeave={(e) => !(uploading || !certificateId || !selectedFile) && (e.target.style.backgroundColor = '#f97316')}
            >
              {uploading ? (
                <>
                  <FaSpinner style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                  Uploading...
                </>
              ) : (
                <>
                  <FaUpload style={{ marginRight: '0.5rem' }} />
                  Upload Document
                </>
              )}
            </button>
          </form>

          {uploadResult && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: uploadResult.success ? '#ecfdf5' : '#fef2f2',
              border: `1px solid ${uploadResult.success ? '#86efac' : '#fca5a5'}`,
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {uploadResult.success ? (
                  <FaCheckCircle style={{ color: '#10b981', fontSize: '1.5rem', marginRight: '0.75rem', marginTop: '0.25rem' }} />
                ) : (
                  <FaTimesCircle style={{ color: '#ef4444', fontSize: '1.5rem', marginRight: '0.75rem', marginTop: '0.25rem' }} />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontWeight: 'bold',
                    color: uploadResult.success ? '#065f46' : '#991b1b',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {uploadResult.success ? 'Success!' : 'Upload Failed'}
                  </h3>
                  <p style={{ color: uploadResult.success ? '#047857' : '#dc2626', margin: 0 }}>
                    {uploadResult.message}
                  </p>
                  
                  {uploadResult.success && uploadResult.data && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'white', border: '1px solid #d1fae5', borderRadius: '6px', fontSize: '0.75rem' }}>
                      <p style={{ margin: '0.25rem 0' }}><strong>Certificate ID:</strong> {uploadResult.data.certificateId}</p>
                      <p style={{ margin: '0.25rem 0' }}><strong>File Name:</strong> {uploadResult.data.fileName}</p>
                      <p style={{ margin: '0.25rem 0' }}><strong>File Size:</strong> {formatFileSize(uploadResult.data.fileSize)}</p>
                      <p style={{ margin: '0.25rem 0' }}><strong>File Type:</strong> {uploadResult.data.mimeType}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1e40af', margin: '0 0 0.75rem 0' }}>
              Instructions:
            </h3>
            <ul style={{ fontSize: '0.75rem', color: '#1e40af', margin: 0, paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.25rem' }}>Enter any Certificate ID (will be created if not exists)</li>
              <li style={{ marginBottom: '0.25rem' }}>Select any file format - all types accepted</li>
              <li style={{ marginBottom: '0.25rem' }}>Maximum file size: 100MB</li>
              <li style={{ marginBottom: '0.25rem' }}>If a document already exists, it will be replaced</li>
              <li>No restrictions on file types or certificate validation</li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
