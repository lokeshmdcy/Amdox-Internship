import React from 'react';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Our Job Portal</h1>
          <p className="about-hero-subtitle">
            Connecting talented professionals with their dream careers
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              We are dedicated to bridging the gap between talented job seekers and forward-thinking employers. 
              Our platform is designed to make the job search process more efficient, transparent, and rewarding 
              for both candidates and companies.
            </p>
            <p>
              With cutting-edge technology and a user-centric approach, we strive to create meaningful connections 
              that lead to successful careers and thriving businesses. Our commitment is to provide the best job 
              search experience in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features-section">
        <div className="container">
          <h2>Platform Features</h2>
          <p className="section-subtitle">Everything you need to find or fill your next opportunity</p>
          
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon">🔍</div>
              <h3>Advanced Job Search</h3>
              <p>
                Search through thousands of job listings with powerful filters. Find positions that match 
                your skills, experience level, and salary expectations in seconds.
              </p>
              <ul className="feature-list">
                <li>Keyword-based search</li>
                <li>Location filtering</li>
                <li>Salary range options</li>
                <li>Job type categories</li>
              </ul>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">👤</div>
              <h3>Profile Management</h3>
              <p>
                Create a comprehensive professional profile that showcases your skills, experience, 
                and achievements. Stand out to potential employers.
              </p>
              <ul className="feature-list">
                <li>Customizable avatars</li>
                <li>Skills showcase</li>
                <li>Education & experience</li>
                <li>Resume upload</li>
              </ul>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">📝</div>
              <h3>Easy Application Process</h3>
              <p>
                Apply to multiple jobs with just a few clicks. Track your applications and stay 
                updated on your job search progress.
              </p>
              <ul className="feature-list">
                <li>One-click applications</li>
                <li>Application tracking</li>
                <li>Status updates</li>
                <li>Application history</li>
              </ul>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🏢</div>
              <h3>For Employers</h3>
              <p>
                Post jobs, manage applications, and find the perfect candidates for your team. 
                Streamline your hiring process from start to finish.
              </p>
              <ul className="feature-list">
                <li>Job posting management</li>
                <li>Applicant tracking</li>
                <li>Company profiles</li>
                <li>Candidate filtering</li>
              </ul>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>
                Your data security and privacy are our top priorities. We use industry-standard 
                encryption and security measures to protect your information.
              </p>
              <ul className="feature-list">
                <li>Encrypted data storage</li>
                <li>Privacy controls</li>
                <li>Secure authentication</li>
                <li>GDPR compliant</li>
              </ul>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>
                Access our platform from any device. Search for jobs, manage applications, and 
                update your profile on the go.
              </p>
              <ul className="feature-list">
                <li>Responsive design</li>
                <li>Cross-device sync</li>
                <li>Mobile-friendly interface</li>
                <li>Fast performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="about-stats">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Job Listings</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">Registered Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500,000+</div>
              <div className="stat-label">Job Seekers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Successful Hires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why-choose">
        <div className="container">
          <h2>Why Choose Our Platform?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-icon">✨</div>
              <h4>User-Friendly Interface</h4>
              <p>Intuitive design that makes job searching and recruiting effortless</p>
            </div>
            <div className="why-choose-item">
              <div className="why-icon">⚡</div>
              <h4>Fast & Efficient</h4>
              <p>Quick loading times and streamlined processes save you time</p>
            </div>
            <div className="why-choose-item">
              <div className="why-icon">🎯</div>
              <h4>Quality Matches</h4>
              <p>Smart algorithms connect the right candidates with the right jobs</p>
            </div>
            <div className="why-choose-item">
              <div className="why-icon">💼</div>
              <h4>Diverse Opportunities</h4>
              <p>Jobs across all industries, experience levels, and locations</p>
            </div>
            <div className="why-choose-item">
              <div className="why-icon">🤝</div>
              <h4>Trusted Platform</h4>
              <p>Verified employers and authentic job listings you can trust</p>
            </div>
            <div className="why-choose-item">
              <div className="why-icon">📈</div>
              <h4>Career Growth</h4>
              <p>Find opportunities that align with your career goals and aspirations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of professionals who have found their dream jobs through our platform</p>
          <div className="about-cta-buttons">
            <a href="/register" className="btn btn-primary btn-large">Create Account</a>
            <a href="/jobs" className="btn btn-outline btn-large">Browse Jobs</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
