// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model
const { sendmessage, getmessage } = require('../controllers/contactController');

// Handle POST request to /contact
router.post('/', sendmessage)
router.get('/', getmessage)
module.exports = router;
