const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please provide name, email, and password' });

    const existing = await Student.findOne({ email });
    if (existing)
      return res.status(409).json({ message: 'Email already registered. Please use a different email.' });

    const student = await Student.create({ name, email, password });
    res.status(201).json({
      message: 'Registration successful',
      student: { _id: student._id, name: student.name, email: student.email },
      token: generateToken(student._id),
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ message: 'Email already registered. Please use a different email.' });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password' });

    const student = await Student.findOne({ email });
    if (!student)
      return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await student.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    res.status(200).json({
      message: 'Login successful',
      student: { _id: student._id, name: student.name, email: student.email },
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
