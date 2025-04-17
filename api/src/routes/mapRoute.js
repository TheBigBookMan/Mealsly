const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

// * /chefs
// Get chefs by latitude and longitude
router.get('/chefs', mapController.getChefsByLatLon);

module.exports = router;