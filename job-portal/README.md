# Job Portal

A full-stack job listing portal that connects job seekers with employers. Built with Node.js, Express, MongoDB, and React.

## Features

### User Authentication
- Secure user registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access (Job Seekers & Employers)

### For Job Seekers
- Browse and search job listings
- Advanced filters (job type, location, keyword, salary range)
- Create and manage profile
- Upload resume
- Apply for jobs with cover letters
- Track application status
- Dashboard to view all applications

### For Employers
- Create company profile
- Post, edit, and delete job listings
- View all applications received
- Manage candidate applications
- Update application status (pending, reviewed, shortlisted, accepted, rejected)
- Dashboard to manage all job postings

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads

### Frontend
- React
- React Router for navigation
- Axios for API calls
- CSS3 for styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Create uploads directory:
```bash
mkdir -p uploads/resumes
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)
- `GET /api/jobs/employer/me` - Get employer's jobs (Employer only)

### Applications
- `POST /api/applications` - Apply for job (Job Seeker only)
- `GET /api/applications/my-applications` - Get user's applications (Job Seeker only)
- `GET /api/applications/received` - Get received applications (Employer only)
- `PUT /api/applications/:id/status` - Update application status (Employer only)
- `GET /api/applications/:id` - Get single application

### Profile
- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update profile (Protected)
- `POST /api/profile/resume` - Upload resume (Job Seeker only)

## Database Models

### User
- name, email, password, role, phone
- Job Seeker: resume, skills, education, experience
- Employer: companyName, companyDescription, companyWebsite

### Job
- title, description, qualifications, responsibilities
- jobType, location, salaryRange
- employer (reference to User)
- status (active/closed)

### Application
- job (reference to Job)
- jobSeeker (reference to User)
- employer (reference to User)
- coverLetter, status
- appliedAt, updatedAt

## Usage

1. **Register** as either a Job Seeker or Employer
2. **Job Seekers** can:
   - Browse jobs on the homepage
   - Use filters to find relevant positions
   - Create/update their profile
   - Upload resume
   - Apply to jobs
   - Track application status in dashboard

3. **Employers** can:
   - Create company profile
   - Post new job listings
   - View all applications
   - Manage candidate applications
   - Update application statuses
   - Delete job postings

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected routes for authenticated users
- Role-based access control
- File upload validation (resume uploads)

## Project Structure

```
job-portal/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── api.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Future Enhancements

- Email notifications for application updates
- Real-time chat between employers and candidates
- Advanced analytics dashboard
- Job recommendations based on user profile
- Company reviews and ratings
- Integration with LinkedIn
- Automated resume parsing
- Video interview scheduling

## License

ISC

## Author

Created for Amdox Internship
