const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable


// * /

// * /create-setup-intent
// Post setup stripe payment intent
router.post('/create-setup-intent', verifyFirebaseToken, userController.createStripeSetupIntent);

// * /:id/add-card
// Post new card payment
// router.post('/:id/add-card', userController.addCardPayment);

module.exports = router;