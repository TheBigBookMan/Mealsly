const { prisma } = require('../db/prisma');
const cuisineService = require('../services/cuisineService');
const { errorHttp } = require('../utils/errors');

class CuisineController {
    async getAllCuisines (req, res) {
        try {
            const cuisines = await cuisineService.getCuisines();
            res.json(cuisines);
        } catch(error) {
            errorHttp(res, error, 'Error fetching cuisines', 500);
        }
    }
}

module.exports = new CuisineController();