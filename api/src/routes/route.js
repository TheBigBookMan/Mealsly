const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const userRoutes = require('./userRoute');
const chefRoutes = require('./chefRoute');
const eaterRoutes = require('./eaterRoute');
const mapRoutes = require('./mapRoute');
const cuisineRoutes = require('./cuisineRoute');
const listingRoutes = require('./listingRoute');
const tagRoutes = require('./tagRoute');
const orderRoutes = require('./orderRoute');
const transactionRoutes = require('./transactionRoute');

// TODO create a separate unauthed route where doesnt have verifyfirebasetoken in it because there wont be one coming from frontend

// Mount routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chef', chefRoutes);
router.use('/eater', eaterRoutes);
router.use('/map', mapRoutes);
router.use('/cuisine', cuisineRoutes);
router.use('/listing', listingRoutes);
router.use('/tag', tagRoutes);
router.use('/order', orderRoutes);
// router.use('/transaction', transactionRoutes);

module.exports = router;