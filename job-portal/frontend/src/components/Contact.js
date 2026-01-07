import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We're here to help and answer any question you might have</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="contact-info-card">
              <div className="contact-icon">📍</div>
              <h3>Our Office</h3>
              <p>123 Business Avenue<br />
              Tech District, Suite 500<br />
              San Francisco, CA 94102<br />
              United States</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">📧</div>
              <h3>Email Us</h3>
              <p>
                <a href="mailto:info@jobportal.com">info@jobportal.com</a><br />
                <a href="mailto:support@jobportal.com">support@jobportal.com</a><br />
                <a href="mailto:careers@jobportal.com">careers@jobportal.com</a>
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>
                Main: +1 (555) 123-4567<br />
                Support: +1 (555) 987-6543<br />
                Fax: +1 (555) 123-4568
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">🕐</div>
              <h3>Business Hours</h3>
              <p>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="contact-form-card">
              <h2>Send us a Message</h2>
              <p className="form-description">
                Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="contact-additional-info">
          <div className="info-section">
            <h3>Why Contact Us?</h3>
            <ul>
              <li>🎯 <strong>Job Seekers:</strong> Get assistance with your job search, application process, or account issues</li>
              <li>💼 <strong>Employers:</strong> Learn about posting jobs, managing applications, and premium features</li>
              <li>🤝 <strong>Partnerships:</strong> Explore collaboration opportunities and business partnerships</li>
              <li>💡 <strong>Feedback:</strong> Share your suggestions to help us improve our platform</li>
              <li>🛠️ <strong>Technical Support:</strong> Report bugs or get help with technical issues</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Quick Links</h3>
            <div className="quick-links">
              <a href="/jobs" className="quick-link-item">Browse Jobs</a>
              <a href="/register" className="quick-link-item">Create Account</a>
              <a href="/" className="quick-link-item">Help Center</a>
              <a href="/privacy-policy" className="quick-link-item">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
