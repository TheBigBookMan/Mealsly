const express = require('express');
const router = express.Router();
const eaterController = require('../controllers/eaterController');

// * /
// Get all Eaters
router.get('/', eaterController.getAllEaters);

module.exports = router;