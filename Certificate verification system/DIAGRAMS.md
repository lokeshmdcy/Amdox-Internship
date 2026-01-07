# Certificate Verification System - System Diagrams

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │             React Frontend (Port 3000)                │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │  │
│  │  │   Home   │  │   Login   │  │ Search Certificate │  │  │
│  │  └──────────┘  └───────────┘  └──────────────────┘  │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │         Admin Dashboard                          │ │  │
│  │  │  - Upload Excel                                  │ │  │
│  │  │  - View Certificates                             │ │  │
│  │  │  - Statistics                                    │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/HTTPS (REST API)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│              Backend Server (Node.js + Express)              │
│                      Port 5000                               │
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │
│  │ Auth Routes    │  │ Certificate    │  │ Admin Routes  │ │
│  │ /api/auth      │  │ Routes         │  │ /api/admin    │ │
│  │                │  │ /api/certs     │  │               │ │
│  │ - Login        │  │ - Search       │  │ - Upload      │ │
│  │ - Register     │  │ - Verify       │  │ - Manage      │ │
│  │ - Profile      │  │ - Download     │  │ - Stats       │ │
│  └────────────────┘  └────────────────┘  └───────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Middleware Layer                            ││
│  │  - JWT Authentication                                    ││
│  │  - Role Authorization                                    ││
│  │  - File Upload (Multer)                                  ││
│  │  - Rate Limiting                                         ││
│  │  - Error Handling                                        ││
│  └─────────────────────────────────────────────────────────┘│
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  MongoDB Database                            │
│                   Port 27017                                 │
│                                                               │
│  ┌──────────────────────┐      ┌──────────────────────┐    │
│  │   Users Collection   │      │Certificates Collection│    │
│  │                      │      │                       │    │
│  │ - _id               │      │ - _id                 │    │
│  │ - name              │      │ - certificateId       │    │
│  │ - email             │      │ - studentName         │    │
│  │ - password (hashed) │      │ - internshipDomain    │    │
│  │ - role              │      │ - startDate           │    │
│  │ - isActive          │      │ - endDate             │    │
│  │ - createdAt         │      │ - duration            │    │
│  │                      │      │ - grade               │    │
│  │                      │      │ - status              │    │
│  │                      │      │ - uploadedBy          │    │
│  │                      │      │ - createdAt           │    │
│  └──────────────────────┘      └──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### 1. User Authentication Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Enter credentials
     ▼
┌─────────────────┐
│  Login Page     │
└────┬────────────┘
     │ 2. POST /api/auth/login
     ▼
┌──────────────────────────┐
│  Auth Controller         │
│  1. Validate input       │
│  2. Find user in DB      │
│  3. Compare password     │
│  4. Generate JWT token   │
└────┬─────────────────────┘
     │ 3. Return token + user data
     ▼
┌──────────────────────┐
│  Frontend            │
│  1. Store token      │
│  2. Store user data  │
│  3. Redirect to page │
└──────────────────────┘
```

### 2. Certificate Search Flow

```
┌──────────┐
│ Student  │
└────┬─────┘
     │ 1. Enter certificate ID
     ▼
┌─────────────────────┐
│ Search Page         │
└────┬────────────────┘
     │ 2. GET /api/certificates/search/:id
     ▼
┌────────────────────────────────┐
│  Certificate Controller        │
│  1. Validate certificate ID    │
│  2. Query MongoDB              │
│  3. Check status               │
│  4. Return certificate data    │
└────┬───────────────────────────┘
     │ 3. Certificate data
     ▼
┌──────────────────────────────┐
│  Display Certificate         │
│  - Student name              │
│  - Domain                    │
│  - Duration                  │
│  - Download PDF button       │
└──────────────────────────────┘
```

### 3. Excel Upload Flow

```
┌────────┐
│ Admin  │
└───┬────┘
    │ 1. Select Excel file
    ▼
┌─────────────────────────┐
│ Admin Dashboard         │
│ File input              │
└───┬─────────────────────┘
    │ 2. POST /api/admin/certificates/upload
    │    (multipart/form-data)
    ▼
┌────────────────────────────────────────┐
│ Upload Middleware (Multer)             │
│ 1. Validate file type                  │
│ 2. Check file size                     │
│ 3. Save to uploads/ directory          │
└───┬────────────────────────────────────┘
    │ 3. File path
    ▼
┌─────────────────────────────────────────────┐
│ Admin Controller                            │
│ 1. Read Excel file (XLSX)                  │
│ 2. Parse rows to JSON                      │
│ 3. For each row:                           │
│    ├─ Validate required fields             │
│    ├─ Check for duplicates                 │
│    ├─ Parse dates                          │
│    ├─ Create certificate                   │
│    └─ Track success/failure                │
│ 4. Delete uploaded file                    │
│ 5. Return detailed results                 │
└───┬─────────────────────────────────────────┘
    │ 4. Upload results
    ▼
┌──────────────────────────────┐
│ Display Results              │
│ - Total: 10                  │
│ - Success: 8                 │
│ - Failed: 1                  │
│ - Duplicates: 1              │
│ - Failed records details     │
└──────────────────────────────┘
```

### 4. PDF Certificate Generation Flow

```
┌──────────┐
│ Student  │
└────┬─────┘
     │ 1. Click "Download Certificate"
     ▼
┌──────────────────────────────┐
│ Certificate Search Page      │
└────┬─────────────────────────┘
     │ 2. GET /api/certificates/download/:id
     ▼
┌────────────────────────────────────────┐
│ Certificate Controller                 │
│ 1. Fetch certificate from DB           │
│ 2. Verify certificate is active        │
│ 3. Create PDF Document (PDFKit)        │
│ 4. Apply certificate template:         │
│    ├─ Add borders                      │
│    ├─ Add header (Certificate title)   │
│    ├─ Add student name                 │
│    ├─ Add internship details           │
│    ├─ Add dates and duration           │
│    ├─ Add certificate ID               │
│    └─ Add signature sections           │
│ 5. Stream PDF to response              │
└────┬───────────────────────────────────┘
     │ 3. PDF file stream
     ▼
┌──────────────────────────────┐
│ Browser                      │
│ 1. Receive PDF blob          │
│ 2. Trigger download          │
│ 3. Save as certificate-ID.pdf│
└──────────────────────────────┘
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Layer 1: Network Security                                ││
│  │  - CORS (allowed origins only)                           ││
│  │  - Rate Limiting (100 req/15min per IP)                  ││
│  │  - Helmet (Security headers)                             ││
│  │  - HTTPS (in production)                                 ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Layer 2: Authentication                                  ││
│  │  - JWT Tokens (7 day expiration)                         ││
│  │  - Password Hashing (bcryptjs, 10 rounds)                ││
│  │  - Token verification on each request                    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Layer 3: Authorization                                   ││
│  │  - Role-based access (Admin/User)                        ││
│  │  - Protected routes (auth middleware)                    ││
│  │  - Admin-only operations (isAdmin middleware)            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Layer 4: Input Validation                                ││
│  │  - Express-validator (route-level)                       ││
│  │  - Mongoose schema validation (model-level)              ││
│  │  - File type validation (uploads)                        ││
│  │  - File size limits (5MB)                                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Layer 5: Data Protection                                 ││
│  │  - Mongoose prevents SQL injection                       ││
│  │  - Password never returned in responses                  ││
│  │  - Error messages don't leak data                        ││
│  │  - Sensitive data encryption                             ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Relationships

```
Frontend Components:
┌────────────────────────────────────────────────────────┐
│                        App.js                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │            AuthProvider (Context)                 │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │           Router                            │  │ │
│  │  │  ┌──────────────────────────────────────┐  │  │ │
│  │  │  │         Navbar                        │  │  │ │
│  │  │  └──────────────────────────────────────┘  │  │ │
│  │  │                                             │  │ │
│  │  │  Routes:                                    │  │ │
│  │  │  ┌──────────────────────────────────────┐  │  │ │
│  │  │  │  /              → Home              │  │  │ │
│  │  │  │  /login         → Login             │  │  │ │
│  │  │  │  /search        → SearchCertificate │  │  │ │
│  │  │  │  /admin/dashboard → AdminDashboard  │  │  │ │
│  │  │  │                   (Protected)        │  │  │ │
│  │  │  └──────────────────────────────────────┘  │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

```
Backend Components:
┌─────────────────────────────────────────────────────────┐
│                     server.js                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Security Middleware                               │ │
│  │  - helmet(), cors(), rateLimit()                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Route Mounting                                    │ │
│  │  - /api/auth         → authRoutes                  │ │
│  │  - /api/certificates → certificateRoutes           │ │
│  │  - /api/admin        → adminRoutes                 │ │
│  └───────────────────────────────────────────────────┘ │
│                                                          │
│  Each Route connects to:                                │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Validation  │→ │  Middleware  │→ │  Controller  │  │
│  │  (express-  │  │   (auth,     │  │   (business  │  │
│  │  validator) │  │   isAdmin)   │  │    logic)    │  │
│  └─────────────┘  └──────────────┘  └──────┬───────┘  │
│                                              │           │
│                                              ▼           │
│                                     ┌──────────────┐    │
│                                     │   Models     │    │
│                                     │  (Mongoose)  │    │
│                                     └──────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema Relationships

```
┌────────────────────────┐            ┌──────────────────────┐
│    users                │            │   certificates       │
├────────────────────────┤            ├──────────────────────┤
│ _id: ObjectId          │◄───────────│ uploadedBy: ObjectId │
│ name: String           │   1    *   │                      │
│ email: String (unique) │            │ _id: ObjectId        │
│ password: String       │            │ certificateId: String│
│ role: String           │            │ studentName: String  │
│ isActive: Boolean      │            │ internshipDomain: ..│
│ createdAt: Date        │            │ startDate: Date      │
└────────────────────────┘            │ endDate: Date        │
                                      │ duration: String     │
                                      │ grade: String        │
                                      │ status: String       │
                                      │ issuedDate: Date     │
                                      │ createdAt: Date      │
                                      │ updatedAt: Date      │
                                      └──────────────────────┘

Legend:
  1 ──── * : One-to-Many relationship
  ◄────── : Foreign key reference
```

---

## 🔄 Request-Response Cycle

```
┌─────────────────────────────────────────────────────────────┐
│         Typical API Request-Response Flow                    │
│                                                               │
│  1. Client Request                                           │
│  ┌──────────────────────────────────────┐                   │
│  │ GET /api/certificates/search/CERT001  │                   │
│  │ Headers: {                             │                   │
│  │   Authorization: "Bearer <token>"     │                   │
│  │ }                                      │                   │
│  └───────────────┬──────────────────────┘                   │
│                  │                                            │
│  2. Express Router                                           │
│  ┌───────────────▼──────────────────────┐                   │
│  │ Match route:                          │                   │
│  │ /api/certificates/search/:id          │                   │
│  └───────────────┬──────────────────────┘                   │
│                  │                                            │
│  3. Middleware Chain (optional)                              │
│  ┌───────────────▼──────────────────────┐                   │
│  │ If protected:                         │                   │
│  │  - Verify JWT token                   │                   │
│  │  - Check user role                    │                   │
│  └───────────────┬──────────────────────┘                   │
│                  │                                            │
│  4. Controller Function                                      │
│  ┌───────────────▼──────────────────────┐                   │
│  │ certificateController.search()        │                   │
│  │  - Validate input                     │                   │
│  │  - Query database                     │                   │
│  │  - Process data                       │                   │
│  └───────────────┬──────────────────────┘                   │
│                  │                                            │
│  5. Database Query                                           │
│  ┌───────────────▼──────────────────────┐                   │
│  │ Certificate.findOne({                 │                   │
│  │   certificateId: "CERT001"            │                   │
│  │ })                                    │                   │
│  └───────────────┬──────────────────────┘                   │
│                  │                                            │
│  6. Send Response                                            │
│  ┌───────────────▼──────────────────────┐                   │
│  │ res.json({                            │                   │
│  │   success: true,                      │                   │
│  │   data: { certificate }               │                   │
│  │ })                                    │                   │
│  └───────────────┬──────────────────────┘                   │
│                  │                                            │
│  7. Client Receives                                          │
│  ┌───────────────▼──────────────────────┐                   │
│  │ Status: 200 OK                        │                   │
│  │ Body: { success: true, data: {...} }  │                   │
│  └───────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

---

**Note:** These diagrams provide a visual representation of the system architecture.
For implementation details, refer to the actual source code files.
