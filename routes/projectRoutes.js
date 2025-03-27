const express = require('express');
const {getProjects, addProject}= require('../controllers/projectController'); // Ensure casing matches
const authenticateAdmin = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getProjects);

// Admin-only routes
router.post('/', authenticateAdmin, addProject);


module.exports = router;