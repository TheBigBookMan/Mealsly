const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable

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
// Delete delete chef permanently by ID- 
// TODO add warning on front end its permanent and they can just put as inactive temporarily
router.delete('/:id', chefController.deleteChefById);

// * /:id/profile-picture
// Get profile pic for chef by ID
router.get('/:id/profile-picture', chefController.getChefProfilePic);
// Put update profile pic for chef
router.put('/:id/profile-picture', chefController.updateChefProfilePic);
// Delete remove profile pic for chef
router.delete('/:id/profile-picture', chefController.deleteChefProfilePic);

// * /:id/inactive
// Make chef inactive or active (toggle) by ID
router.get('/:id/inactive', chefController.becomeInactive);

// * /:id/lat-lon
// Get chefs latitude and longitude by ID
router.get('/:id/lat-lon', chefController.getChefLatLon);
// Put update chef latitude and longitude by ID
router.put('/:id/lat-lon', chefController.updateChefLatLon);

module.exports = router;