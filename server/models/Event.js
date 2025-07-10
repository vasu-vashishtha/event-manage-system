const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  tagLine: String,
  description: String,
  topics: [String],
  date: String,
  time: String,
  duration: String,
  address: String,
  imageUrl: String,
});

module.exports = mongoose.model('Event', eventSchema);
