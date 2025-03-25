const express = require('express');
const router = express.Router();
const { prisma } = require('../db');
const chefController = require('../controllers/chefController');

// '/' Get all Chefs
router.get('/', chefController.getAllChefs);

// '/:chefId' Get chef by ID
router.get('/:id', chefController.getChefById);

// '/:id/inactive' Make chef inactive or active (toggle) by id
router.get('/:id', chefController.becomeInactive);

module.exports = router;