const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const protect = require('../middleware/authMiddleware');

// GET /api/grievances/search?title=xyz  (must be before /:id)
router.get('/search', protect, async (req, res) => {
  try {
    const { title } = req.query;
    if (!title)
      return res.status(400).json({ message: 'Please provide a title query parameter' });

    const grievances = await Grievance.find({
      student: req.user._id,
      title: { $regex: title, $options: 'i' },
    }).populate('student', 'name email');

    res.status(200).json({ count: grievances.length, grievances });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/grievances
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    if (!title || !description || !category)
      return res.status(400).json({ message: 'Title, description, and category are required' });

    const grievance = await Grievance.create({
      student: req.user._id,
      title, description, category,
      status: status || 'Pending',
    });
    res.status(201).json({ message: 'Grievance submitted successfully', grievance });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/grievances
router.get('/', protect, async (req, res) => {
  try {
    const grievances = await Grievance.find({ student: req.user._id })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ count: grievances.length, grievances });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/grievances/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id).populate('student', 'name email');
    if (!grievance)
      return res.status(404).json({ message: 'Grievance not found' });
    if (grievance.student._id.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized to view this grievance' });
    res.status(200).json({ grievance });
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid grievance ID' });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/grievances/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance)
      return res.status(404).json({ message: 'Grievance not found' });
    if (grievance.student.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized to update this grievance' });

    const { title, description, category, status } = req.body;
    if (title) grievance.title = title;
    if (description) grievance.description = description;
    if (category) grievance.category = category;
    if (status) grievance.status = status;

    const updated = await grievance.save();
    res.status(200).json({ message: 'Grievance updated successfully', grievance: updated });
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid grievance ID' });
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/grievances/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance)
      return res.status(404).json({ message: 'Grievance not found' });
    if (grievance.student.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized to delete this grievance' });
    await grievance.deleteOne();
    res.status(200).json({ message: 'Grievance deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid grievance ID' });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
