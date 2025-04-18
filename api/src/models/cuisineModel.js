const {prisma} = require('../db/prisma');

class CuisineModel {
    async findAllCuisines(includeChefs) {
        return await prisma.cuisine.findMany({
            include: {
                chefs: includeChefs
            }
        });
    }

    async getExistingCuisineId(id, includeChefs) {
        return await prisma.cuisine.findUnique({
            where: {id},
            include: {
                chefs: includeChefs
            }
        });
    }
}

module.exports = new CuisineModel();