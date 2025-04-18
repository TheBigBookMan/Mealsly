const {prisma} = require('../db/prisma');

class CuisineModel {
    async findAllCuisines() {
        return await prisma.cuisine.findMany();
    }
}

module.exports = new CuisineModel();