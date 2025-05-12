const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable

// * /
// Post create a new order
router.post('/', orderController.createOrder);

// Get a single order

// Get all orders from an account