const { prisma } = require('../db/prisma');
const cuisineService = require('../services/cuisineService');
const { errorHttp } = require('../utils/errors');

class CuisineController {
    async createCuisine (req, res) {
        const {name, flagCode, popularity} = req.body;

        try {

            const cuisineExists = await prisma.cuisine.findUnique({where: {name}});

            if(cuisineExists) return errorHttp(res, `Existing: ${name}`, 'Cuisine already exits', 400);

            const cuisine = await prisma.cuisine.create({
                data: {
                    name,
                    flagCode,
                    popularity
                }
            });

            return res.status(201).json({success: true, cuisine});

        } catch(error) {
            errorHttp(res, error, 'Error creating cuisine', 500);
        }
    }

    async getAllCuisines (req, res) {
        const includeChefs = req.query.includeChefs === 'true';

        try {
            const cuisines = await cuisineService.getCuisines(includeChefs);
            res.json(cuisines);
        } catch(error) {
            errorHttp(res, error, 'Error fetching cuisines', 500);
        }
    }

    async getCuisineById (req, res) {
        const {id} = req.params;
        const includeChefs = req.query.includeChefs === 'true';

        try {

            const cuisine = await cuisineService.getExistingCuisineId(id, includeChefs);

            if(!cuisine) return errorHttp(res, `Existing: ${id}`, 'Cuisine does not exist', 400);

            res.json(cuisine);

        } catch(error) {
            errorHttp(res, error, 'Error fetching cuisine', 500);
        } 
    }

    async updateCuisinePopularity (req, res) {
        const {id} = req.params;

        try {

            const cuisineExists = await cuisineService.getExistingCuisineId(id);

            if(!cuisineExists) return errorHttp(res, `Existing: ${id}`, 'Cuisine does not exist', 400);

            const updatedPopularity = cuisineExists.popularity + 1;

            await prisma.cuisine.update({
                where: {id},
                data: {
                    popularity: updatedPopularity
                }
            });

            return res.json({success: true, message: 'Successfully updated cuisine popularity'});

        } catch(error) {
            errorHttp(res, error, 'Error updating cuisine popularity', 500);
        }
    }
}

module.exports = new CuisineController();