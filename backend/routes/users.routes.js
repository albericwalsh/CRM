const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

// GET /users/profile
router.get('/profile', userController.getProfile);

module.exports = router;
