const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/authRoutes'));
app.use('/api/grievances', require('./routes/grievanceRoutes'));

app.get('/', (req, res) => {
  res.json({
    message: '🎓 Student Grievance Management System API is running',
    endpoints: {
      register: 'POST /api/register',
      login: 'POST /api/login',
      submitGrievance: 'POST /api/grievances',
      getAllGrievances: 'GET /api/grievances',
      getById: 'GET /api/grievances/:id',
      update: 'PUT /api/grievances/:id',
      delete: 'DELETE /api/grievances/:id',
      search: 'GET /api/grievances/search?title=xyz',
    },
  });
});

app.use((req, res) => res.status(404).json({ message: `Route ${req.originalUrl} not found` }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
