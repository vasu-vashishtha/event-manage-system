const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { importEvents } = require('../controllers/eventController');

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const auth = require('../middleware/authMiddleware');

router.get('/', getAllEvents); // Public
router.get('/:id', getEventById); // Public

router.post('/', auth, createEvent); // Admin only
router.put('/:id', auth, updateEvent); // Admin only
router.delete('/:id', auth, deleteEvent); // Admin only

router.post('/import', auth, upload.single('file'), importEvents);

module.exports = router;
