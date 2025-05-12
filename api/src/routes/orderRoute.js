const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable

// * /
// Post create a new order
router.post('/', orderController.createOrder);

// * /:orderId?includeChef=false/true&includeEater=false/true
// Get a single order
router.get('/:orderId', orderController.getOrderById);

// * /:orderId?orderStatus=PENDING/CONFIRMED/PREPARING/READY/COMPLETED/CANCELLED
// Update order status
router.put('/:orderId', orderController.updateOrderStatus);

// * /eater/:eaterId?includeChef=false/true
// Get all orders from an eater
router.get('/eater/:eaterId', orderController.getOrdersByEater);

// * /chef/:chefId?includeeater=false/true
// Get all orders from a chef
router.get('/chef/:chefId', orderController.getOrdersByChef);

module.exports = router;