# 🎓 Student Grievance Management System — Frontend

**AI-Driven Full Stack Development (AI308B) | B.Tech 4th Semester | MSE-2 2025-26**

---

## 📁 Project Structure

```
grievance-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GrievanceCard.js     # Renders individual grievance
│   │   ├── GrievanceForm.js     # Submit/Edit modal form
│   │   └── ProtectedRoute.js    # JWT-based route guard
│   ├── context/
│   │   └── AuthContext.js       # Global auth state (React Context)
│   ├── pages/
│   │   ├── Register.js          # Registration form
│   │   ├── Login.js             # Login form
│   │   └── Dashboard.js         # Main protected dashboard
│   ├── utils/
│   │   └── api.js               # Axios instance + all API calls
│   ├── App.js                   # Routes
│   ├── index.js                 # Entry point
│   └── index.css                # Global design system
├── .env
├── .env.example
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Navigate to frontend folder
```bash
cd grievance-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```
> For production, change this to your Render backend URL:
> `REACT_APP_API_URL=https://your-backend.onrender.com/api`

### 4. Start the app
```bash
npm start
```
Opens at `http://localhost:3000`

---

## 🖥️ Pages & Features

### `/register` — Registration Form
- Fields: Full Name, Email, Password
- Calls `POST /api/register`
- On success: auto-login + redirect to dashboard
- Handles: duplicate email error

### `/login` — Login Form
- Fields: Email, Password
- Calls `POST /api/login`
- On success: stores JWT in localStorage + redirect
- Handles: invalid credentials error

### `/dashboard` — Protected Dashboard
- Protected: redirects to `/login` if not authenticated
- **Stats bar**: Total / Pending / Resolved count
- **Submit grievance**: modal form (title, description, category, status)
- **View all grievances**: card grid with category tag + status badge
- **Search**: by title keyword → `GET /api/grievances/search?title=xyz`
- **Edit**: opens pre-filled modal → `PUT /api/grievances/:id`
- **Delete**: confirmation → `DELETE /api/grievances/:id`
- **Logout**: clears token + redirect to login

---

## 🔐 Auth Flow

- JWT token saved in `localStorage` on login/register
- Axios interceptor attaches `Authorization: Bearer <token>` to all requests
- `ProtectedRoute` component checks token before rendering dashboard

---

## 🚀 Deployment on Render (Static Site)

1. Push code to GitHub
2. Render → New → Static Site
3. Connect repo, set:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend.onrender.com/api`
5. Deploy!

---

## 📚 Tech Stack

- **React** 18 (Create React App)
- **React Router DOM** v6
- **Axios** (HTTP client)
- **React Context API** (auth state)
- **CSS Variables** (design system, no external UI library)
