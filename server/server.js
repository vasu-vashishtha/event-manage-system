const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/register', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use('/uploads', express.static('uploads'));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));


