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
// Delete delete eater permanently by ID-
// TODO add warning on front end its permanent and they can just put as inactive temporarily
router.delete('/:id', eaterController.deleteEaterById);

module.exports = router;