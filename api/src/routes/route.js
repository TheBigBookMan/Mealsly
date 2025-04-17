const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const chefRoutes = require('./chefRoute');
const eaterRoutes = require('./eaterRoute');
const mapRoutes = require('./mapRoute');
const listingRoutes = require('./listingRoute');
const orderRoutes = require('./orderRoute');
const transactionRoutes = require('./transactionRoute');

// Mount routes
router.use('/auth', authRoutes);
router.use('/chef', chefRoutes);
router.use('/eater', eaterRoutes);
router.use('/map', mapRoutes);
// router.use('/listing', listingRoutes);
// router.use('/order', orderRoutes);
// router.use('/transaction', transactionRoutes);

module.exports = router;