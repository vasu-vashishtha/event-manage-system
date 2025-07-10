const User = require('../models/User');
const Event = require('../models/Event');

exports.registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { eventId } = req.params;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = new User({ name, email, eventId });
    await newUser.save();

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('eventId', 'name date');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
