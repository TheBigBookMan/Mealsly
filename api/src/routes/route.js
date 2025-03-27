const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const chefRoutes = require('./chefRoute');
const eaterRoutes = require('./eaterRoute');
const listingRoutes = require('./listingRoute');
const orderRoutes = require('./orderRoute');
const transactionRoutes = require('./transactionRoute');

// Mount routes
router.use('/auth', authRoutes);
router.use('/chefs', chefRoutes);
router.use('/eaters', eaterRoutes);
router.use('/listings', listingRoutes);
router.use('/orders', orderRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;