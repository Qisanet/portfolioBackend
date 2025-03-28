const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoute');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ✅ Enable CORS before any routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// ✅ Handle preflight requests properly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));  
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/admin', adminRoutes); // Admin-related routes
app.use('/projects', projectRoutes); // Project-related routes
app.use('/contact', contactRoutes); // Contact form routes

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  if (err.name === 'ValidationError') {  // ✅ Fixed typo
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }

  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Start the server
const PORT = process.env.PORT || 5151;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
