const {prisma} = require('../db/prisma');

class CuisineModel {
    async findAllCuisines() {
        return await prisma.cuisine.findMany();
    }

    async getExistingCuisineId(id) {
        return await prisma.cuisine.findUnique({where: {id}});
    }
}

module.exports = new CuisineModel();