const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable


// * /chefs
// Get chefs by latitude and longitude
router.get('/chefs', mapController.getChefsByLatLon);

module.exports = router;