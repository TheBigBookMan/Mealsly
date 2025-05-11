const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable

// * /
// Post create a listing
router.post('/', listingController.createListing);

// * /cuisine/:cuisineId
// Get listings by cuisine
router.get('/cuisine/:cuisineId', listingController.getListingsByCuisine);

module.exports = router;