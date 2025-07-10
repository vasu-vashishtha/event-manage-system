const Event = require('../models/Event');
const xlsx = require('xlsx');
const fs = require('fs');

// GET all events
exports.getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
};

// GET single event
exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

// POST create new event
exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
};

// PUT update event
exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json({ message: 'Event deleted' });
};

// excel file controller
exports.importEvents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Validate and transform data
    const events = rawData.map(row => {
      const {
        name,
        tagLine,
        description,
        topics,
        date,
        time,
        duration,
        address,
        imageUrl,
      } = row;

      return {
        name,
        tagLine,
        description,
        topics: typeof topics === 'string' ? topics.split(',').map(t => t.trim()) : [],
        date,
        time,
        duration,
        address,
        imageUrl,
      };
    });

    const inserted = await Event.insertMany(events);

    // Optional: delete file after use
    fs.unlinkSync(filePath);

    res.status(201).json({ message: 'Events imported successfully', inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Import failed' });
  }
};

