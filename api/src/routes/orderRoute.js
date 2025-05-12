const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable

// * /
// Post create a new order
router.post('/', orderController.createOrder);

// * /:orderId
// Get a single order
router.get('/:orderId', orderController.getOrderById);

// Get all orders from an eater

// Get all orders from a chef