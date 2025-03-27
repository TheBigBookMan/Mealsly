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

// * /id/profile-picture
// Get profile pic for Eater by ID
router.get('/:id/profile-picture', eaterController.getEaterProfilePic);
// Put update profile pic for Eater
router.put('/:id/profile-picture', eaterController.updateEaterProfilePic);
// Delete remove profile pic for Eater
router.delete('/:id/profile-picture', eaterController.deleteEaterProfilePic);

// * /:id/lat-lon
// Get Eaters latitude and longitude by ID
router.get('/:id/lat-lon', eaterController.getEaterLatLon);
// Put update eater latitude and longitude by ID
router.put('/:id/lat-lon', eaterController.updateEaterLatLon);

module.exports = router;