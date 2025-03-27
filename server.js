const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoute');
const cors = require('cors');
const { loginAdmin } = require('./controllers/adminController');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: "1mb" })); // Adjust as needed
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
// Parse JSON request bodies

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/admin', loginAdmin); // All admin-related routes
app.use('/projects', projectRoutes); // All project-related routes
app.use('/contact', contactRoutes);// All contact-related routes

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);

  // Customize the response based on the error type
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }

  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Start the server
const PORT = process.env.PORT || 5151;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});