const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');

// * /
// Get all cuisines
router.get('/', cuisineController.getAllCuisines);
// Post create a cuisine
router.post('/', cuisineController.createCuisine);

// * /:id/popularity
// Put update popularity score for cuisine TODO could be updated everytime someone clicks on a tile or searches for it?
router.put('/:id/popularity', cuisineController.updateCuisinePopularity);

module.exports = router;