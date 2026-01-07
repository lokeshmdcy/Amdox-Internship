const sequelize = require('./config/database');
const User = require('./models/User');
const Job = require('./models/Job');

const seedJobs = async () => {
  try {
    await sequelize.sync();
    
    // Create employer users for different companies
    const employers = await User.bulkCreate([
      {
        name: 'Tech Innovations HR',
        email: 'hr@techinnovations.com',
        password: 'password123',
        role: 'employer',
        companyName: 'Tech Innovations Inc',
        companyDescription: 'Leading technology solutions provider',
        companyWebsite: 'https://techinnovations.com'
      },
      {
        name: 'HealthCare Plus Recruiter',
        email: 'recruiter@healthcareplus.com',
        password: 'password123',
        role: 'employer',
        companyName: 'HealthCare Plus',
        companyDescription: 'Premier healthcare services provider',
        companyWebsite: 'https://healthcareplus.com'
      },
      {
        name: 'EduLearn Hiring',
        email: 'hiring@edulearn.com',
        password: 'password123',
        role: 'employer',
        companyName: 'EduLearn Academy',
        companyDescription: 'Leading online education platform',
        companyWebsite: 'https://edulearn.com'
      },
      {
        name: 'FinServe Talent',
        email: 'talent@finserve.com',
        password: 'password123',
        role: 'employer',
        companyName: 'FinServe Bank',
        companyDescription: 'Global financial services corporation',
        companyWebsite: 'https://finserve.com'
      },
      {
        name: 'Creative Studio HR',
        email: 'hr@creativestudio.com',
        password: 'password123',
        role: 'employer',
        companyName: 'Creative Studio',
        companyDescription: 'Award-winning design and marketing agency',
        companyWebsite: 'https://creativestudio.com'
      },
      {
        name: 'BuildRight Recruitment',
        email: 'recruitment@buildright.com',
        password: 'password123',
        role: 'employer',
        companyName: 'BuildRight Construction',
        companyDescription: 'Premier construction and engineering firm',
        companyWebsite: 'https://buildright.com'
      },
      {
        name: 'GreenEarth Jobs',
        email: 'jobs@greenearth.com',
        password: 'password123',
        role: 'employer',
        companyName: 'GreenEarth Solutions',
        companyDescription: 'Environmental sustainability consultancy',
        companyWebsite: 'https://greenearth.com'
      },
      {
        name: 'RetailMax HR',
        email: 'hr@retailmax.com',
        password: 'password123',
        role: 'employer',
        companyName: 'RetailMax Corporation',
        companyDescription: 'Leading retail chain across the nation',
        companyWebsite: 'https://retailmax.com'
      },
      {
        name: 'LegalPro Hiring',
        email: 'hiring@legalpro.com',
        password: 'password123',
        role: 'employer',
        companyName: 'LegalPro Associates',
        companyDescription: 'Full-service law firm',
        companyWebsite: 'https://legalpro.com'
      }
    ], { individualHooks: true });

    // Create 9 diverse jobs from different fields
    const jobs = await Job.bulkCreate([
      // 1. Technology - Software Engineering
      {
        title: 'Senior Full Stack Developer',
        description: 'We are seeking an experienced Full Stack Developer to join our innovative team. You will work on cutting-edge web applications using modern technologies including React, Node.js, and cloud platforms. This role offers the opportunity to work on challenging projects and contribute to architectural decisions.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field, 5+ years of experience in full-stack development, proficiency in JavaScript/TypeScript, React, Node.js, SQL and NoSQL databases, experience with AWS or Azure, strong problem-solving skills',
        responsibilities: 'Develop and maintain web applications, design scalable system architecture, write clean and maintainable code, collaborate with cross-functional teams, mentor junior developers, participate in code reviews, optimize application performance',
        jobType: 'full-time',
        location: 'San Francisco, CA',
        salaryMin: 120000,
        salaryMax: 180000,
        salaryCurrency: 'USD',
        employerId: employers[0].id,
        companyName: employers[0].companyName,
        status: 'active'
      },
      // 2. Healthcare - Nursing
      {
        title: 'Registered Nurse - ICU',
        description: 'HealthCare Plus is looking for a compassionate and skilled Registered Nurse to join our Intensive Care Unit. You will provide critical care to patients requiring close monitoring and advanced medical interventions. Join our team of dedicated healthcare professionals committed to patient excellence.',
        qualifications: 'Current RN license, BSN preferred, 2+ years of ICU experience, BLS and ACLS certification, strong clinical assessment skills, excellent communication abilities, ability to work in fast-paced environment',
        responsibilities: 'Provide direct patient care in ICU setting, monitor vital signs and patient conditions, administer medications and treatments, collaborate with physicians and healthcare team, maintain accurate patient records, educate patients and families, respond to medical emergencies',
        jobType: 'full-time',
        location: 'New York, NY',
        salaryMin: 75000,
        salaryMax: 95000,
        salaryCurrency: 'USD',
        employerId: employers[1].id,
        companyName: employers[1].companyName,
        status: 'active'
      },
      // 3. Education - Teaching
      {
        title: 'High School Mathematics Teacher',
        description: 'EduLearn Academy seeks an enthusiastic Mathematics Teacher to inspire and educate high school students. You will develop engaging lesson plans, foster a positive learning environment, and help students achieve their academic potential in mathematics.',
        qualifications: 'Bachelor\'s degree in Mathematics or Education, valid teaching certification, experience with modern teaching methodologies, strong classroom management skills, passion for education, excellent communication skills',
        responsibilities: 'Teach mathematics courses (Algebra, Geometry, Calculus), create engaging lesson plans and curriculum, assess student progress and provide feedback, maintain classroom discipline, communicate with parents and administrators, participate in faculty meetings, mentor students',
        jobType: 'full-time',
        location: 'Boston, MA',
        salaryMin: 55000,
        salaryMax: 75000,
        salaryCurrency: 'USD',
        employerId: employers[2].id,
        companyName: employers[2].companyName,
        status: 'active'
      },
      // 4. Finance - Financial Analyst
      {
        title: 'Senior Financial Analyst',
        description: 'Join FinServe Bank as a Senior Financial Analyst and play a key role in financial planning, analysis, and strategic decision-making. You will work with senior leadership to drive business performance through detailed financial insights and recommendations.',
        qualifications: 'Bachelor\'s degree in Finance, Accounting, or Economics, MBA preferred, 5+ years of financial analysis experience, CFA or CPA certification a plus, advanced Excel and financial modeling skills, strong analytical and problem-solving abilities',
        responsibilities: 'Conduct financial analysis and forecasting, prepare detailed financial reports, develop financial models and scenarios, analyze market trends and competitive landscape, present findings to senior management, support budgeting and planning processes, identify cost-saving opportunities',
        jobType: 'full-time',
        location: 'Chicago, IL',
        salaryMin: 90000,
        salaryMax: 130000,
        salaryCurrency: 'USD',
        employerId: employers[3].id,
        companyName: employers[3].companyName,
        status: 'active'
      },
      // 5. Creative - Graphic Designer
      {
        title: 'Creative Graphic Designer',
        description: 'Creative Studio is looking for a talented Graphic Designer to join our award-winning creative team. You will work on diverse projects including branding, digital marketing, print materials, and web design for high-profile clients.',
        qualifications: 'Bachelor\'s degree in Graphic Design or related field, 3+ years of professional design experience, expert proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign), strong portfolio demonstrating creativity and versatility, excellent understanding of typography and color theory',
        responsibilities: 'Create visual concepts and designs for various media, collaborate with creative team and clients, develop brand identity materials, design marketing collateral and digital assets, present design concepts and iterate based on feedback, maintain brand consistency, stay current with design trends',
        jobType: 'full-time',
        location: 'Los Angeles, CA',
        salaryMin: 60000,
        salaryMax: 85000,
        salaryCurrency: 'USD',
        employerId: employers[4].id,
        companyName: employers[4].companyName,
        status: 'active'
      },
      // 6. Construction - Civil Engineer
      {
        title: 'Civil Engineer - Infrastructure Projects',
        description: 'BuildRight Construction seeks an experienced Civil Engineer to lead infrastructure development projects. You will be responsible for designing, planning, and overseeing construction projects including roads, bridges, and public utilities.',
        qualifications: 'Bachelor\'s degree in Civil Engineering, PE license required, 5+ years of civil engineering experience, proficiency in AutoCAD and Civil 3D, strong knowledge of construction codes and regulations, excellent project management skills, PMP certification preferred',
        responsibilities: 'Design civil engineering projects and infrastructure, conduct site inspections and surveys, prepare technical drawings and specifications, oversee construction activities, ensure compliance with safety and building codes, manage project budgets and timelines, coordinate with contractors and stakeholders',
        jobType: 'full-time',
        location: 'Dallas, TX',
        salaryMin: 85000,
        salaryMax: 115000,
        salaryCurrency: 'USD',
        employerId: employers[5].id,
        companyName: employers[5].companyName,
        status: 'active'
      },
      // 7. Environmental - Environmental Scientist
      {
        title: 'Environmental Scientist',
        description: 'GreenEarth Solutions is seeking an Environmental Scientist to conduct research and develop solutions for environmental challenges. You will work on sustainability projects, environmental assessments, and conservation initiatives.',
        qualifications: 'Master\'s degree in Environmental Science or related field, 3+ years of experience in environmental consulting or research, knowledge of environmental regulations and compliance, experience with GIS and environmental modeling software, strong analytical and report writing skills',
        responsibilities: 'Conduct environmental impact assessments, collect and analyze environmental data, prepare technical reports and documentation, ensure regulatory compliance, develop sustainability strategies, conduct field research and sampling, collaborate with clients and regulatory agencies',
        jobType: 'full-time',
        location: 'Seattle, WA',
        salaryMin: 65000,
        salaryMax: 90000,
        salaryCurrency: 'USD',
        employerId: employers[6].id,
        companyName: employers[6].companyName,
        status: 'active'
      },
      // 8. Retail - Store Manager
      {
        title: 'Retail Store Manager',
        description: 'RetailMax Corporation is looking for a dynamic Store Manager to lead our flagship retail location. You will be responsible for all aspects of store operations, team management, and delivering exceptional customer experiences.',
        qualifications: 'Bachelor\'s degree in Business or related field preferred, 5+ years of retail management experience, proven track record of meeting sales targets, strong leadership and team building skills, excellent customer service orientation, proficiency in retail management systems',
        responsibilities: 'Manage daily store operations, lead and develop store team, drive sales and achieve targets, ensure excellent customer service, manage inventory and merchandising, handle staffing and scheduling, analyze sales data and trends, maintain store standards and visual presentation',
        jobType: 'full-time',
        location: 'Miami, FL',
        salaryMin: 55000,
        salaryMax: 75000,
        salaryCurrency: 'USD',
        employerId: employers[7].id,
        companyName: employers[7].companyName,
        status: 'active'
      },
      // 9. Legal - Corporate Attorney
      {
        title: 'Corporate Attorney',
        description: 'LegalPro Associates seeks an experienced Corporate Attorney to provide legal counsel on business transactions, contracts, and corporate governance. You will work with diverse clients ranging from startups to established corporations.',
        qualifications: 'Juris Doctor (JD) from accredited law school, active state bar license, 4+ years of corporate law experience, expertise in contract law, mergers and acquisitions, and corporate governance, excellent negotiation skills, strong attention to detail',
        responsibilities: 'Provide legal advice on corporate matters, draft and review contracts and agreements, conduct legal research and analysis, represent clients in negotiations, ensure regulatory compliance, advise on mergers and acquisitions, handle corporate governance issues, manage client relationships',
        jobType: 'full-time',
        location: 'Washington, D.C.',
        salaryMin: 110000,
        salaryMax: 160000,
        salaryCurrency: 'USD',
        employerId: employers[8].id,
        companyName: employers[8].companyName,
        status: 'active'
      }
    ]);

    console.log('✅ Successfully seeded 9 jobs from different fields:');
    console.log('1. Technology - Senior Full Stack Developer');
    console.log('2. Healthcare - Registered Nurse (ICU)');
    console.log('3. Education - High School Mathematics Teacher');
    console.log('4. Finance - Senior Financial Analyst');
    console.log('5. Creative - Creative Graphic Designer');
    console.log('6. Construction - Civil Engineer');
    console.log('7. Environmental - Environmental Scientist');
    console.log('8. Retail - Retail Store Manager');
    console.log('9. Legal - Corporate Attorney');
    console.log('\n✅ All jobs are now available in the database!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
    process.exit(1);
  }
};

seedJobs();
