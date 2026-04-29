# 🎓 Student Grievance Management System — Backend

**AI-Driven Full Stack Development (AI308B) | B.Tech 4th Semester | MSE-2 2025-26**

---

## 📁 Project Structure

```
grievance-backend/
├── config/
│   └── db.js               # MongoDB connection
├── middleware/
│   └── authMiddleware.js   # JWT protect middleware
├── models/
│   ├── Student.js          # Student schema
│   └── Grievance.js        # Grievance schema
├── routes/
│   ├── authRoutes.js       # Register & Login
│   └── grievanceRoutes.js  # All Grievance CRUD + Search
├── .env                    # Environment variables (not committed)
├── .env.example            # Sample env file
├── .gitignore
├── package.json
└── server.js               # Entry point
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/grievance-backend.git
cd grievance-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/grievanceDB
JWT_SECRET=your_super_secret_key
```

### 4. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

---

## 🔗 API Endpoints

### Auth

| Method | Endpoint        | Description          | Auth Required |
|--------|-----------------|----------------------|---------------|
| POST   | /api/register   | Register new student | No            |
| POST   | /api/login      | Login & get JWT      | No            |

### Grievances

| Method | Endpoint                        | Description              | Auth Required |
|--------|---------------------------------|--------------------------|---------------|
| POST   | /api/grievances                 | Submit grievance         | ✅ Yes        |
| GET    | /api/grievances                 | View all grievances      | ✅ Yes        |
| GET    | /api/grievances/:id             | View grievance by ID     | ✅ Yes        |
| PUT    | /api/grievances/:id             | Update grievance         | ✅ Yes        |
| DELETE | /api/grievances/:id             | Delete grievance         | ✅ Yes        |
| GET    | /api/grievances/search?title=xyz| Search grievance         | ✅ Yes        |

---

## 🔐 Authentication

All grievance endpoints require a **Bearer Token** in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📦 Request Bodies

### POST /api/register
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "secret123"
}
```

### POST /api/login
```json
{
  "email": "rahul@example.com",
  "password": "secret123"
}
```

### POST /api/grievances
```json
{
  "title": "WiFi not working in hostel",
  "description": "The WiFi has been down for 3 days in Block B.",
  "category": "Hostel",
  "status": "Pending"
}
```

### PUT /api/grievances/:id
```json
{
  "status": "Resolved"
}
```

---

## 🚀 Deployment on Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (same as `.env`)
6. Deploy!

---

## 🛡️ Error Handling

| Scenario              | Status Code | Message                                  |
|-----------------------|-------------|------------------------------------------|
| Missing fields        | 400         | Please provide all required fields       |
| Duplicate email       | 409         | Email already registered                 |
| Invalid login         | 401         | Invalid email or password                |
| No token              | 401         | Not authorized, no token provided        |
| Invalid token         | 401         | Not authorized, invalid token            |
| Unauthorized access   | 403         | Not authorized to access this grievance  |
| Not found             | 404         | Grievance not found                      |

---

## 📚 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Deployment**: Render
