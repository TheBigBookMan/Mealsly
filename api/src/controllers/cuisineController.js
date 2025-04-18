const { prisma } = require('../db/prisma');
const cuisineService = require('../services/cuisineService');
const { errorHttp } = require('../utils/errors');

class CuisineController {
    async createCuisine (req, res) {
        const {name, flagCode} = req.body;

        try {

            const cuisineExists = await prisma.cuisine.findUnique({where: {name}});

            if(cuisineExists) return errorHttp(res, cuisineExists.id, 'Cuisine already exits', 400);

            const cuisine = await prisma.cuisine.create({
                data: {
                    name,
                    flagCode
                }
            });

            return res.status(201).json({success: true, cuisine});

        } catch(error) {
            errorHttp(res, error, 'Error creating cuisine', 500);
        }
    }

    async getAllCuisines (req, res) {
        try {
            const cuisines = await cuisineService.getCuisines();
            res.json(cuisines);
        } catch(error) {
            errorHttp(res, error, 'Error fetching cuisines', 500);
        }
    }

    async updateCuisinePopularity (req, res) {
        const {id} = req.params;

        try {

            const cuisineExists = await cuisineService.getExistingCuisineId(id);

            if(!cuisineExists) return errorHttp(res, cuisineExists.id, 'Cuisine does not exist', 400);

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