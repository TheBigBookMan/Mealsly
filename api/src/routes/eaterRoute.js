const express = require('express');
const router = express.Router();
const eaterController = require('../controllers/eaterController');

// * /
// Get all Eaters
router.get('/', eaterController.getAllEaters);
// Post create an Eater
router.post('/', eaterController.createEater);

// * /:id
// Get eater by ID
router.get('/:id', eaterController.getEaterById);
// Put update eater information
router.put('/:id', eaterController.updateEaterDetails);

module.exports = router;