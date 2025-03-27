const express = require('express');
const { loginAdmin } = require('../controllers/adminController'); // Import the controller function
const router = express.Router();

// Use the controller function for the login route
router.post('/admin', loginAdmin);

module.exports = router;