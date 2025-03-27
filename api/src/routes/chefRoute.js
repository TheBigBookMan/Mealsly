const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

// * /
// Get all Chefs
router.get('/', chefController.getAllChefs);
// Post create a chef
router.post('/', chefController.createChef);

// * /:id
// Get chef by ID
router.get('/:id', chefController.getChefById);
// Put update chef information
router.put('/:id', chefController.updateChefDetails);

// Delete delete chef permanently- need to add in a warning about that

// * /:id/inactive
// Make chef inactive or active (toggle) by id
router.get('/:id/inactive', chefController.becomeInactive);

module.exports = router;