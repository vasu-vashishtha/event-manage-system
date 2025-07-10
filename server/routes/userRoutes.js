const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Route: POST /api/users/register/:eventId
router.post('/register/:eventId', registerUser);

// Get All users
router.get('/', auth, getAllUsers); // Admin only

module.exports = router;