const {prisma} = require('../db/prisma');

class CuisineModel {
    async findAllCuisines(includeChefs) {
        return await prisma.cuisine.findMany({
            include: {
                chefs: includeChefs
            }
        });
    }

    async getExistingCuisineId(id, includeChefs = false) {
        return await prisma.cuisine.findUnique({
            where: {id},
            include: {
                chefs: includeChefs
            }
        });
    }

    async getCuisineWithListings(cuisineId) {
        const cuisine = await prisma.cuisine.findUnique({
            where: { id: cuisineId },
            include: {
                Listing: {
                    include: {
                        chef: true,
                        dietryTags: { include: { tag: true } },
                    },
                },
            },
        });

        if (!cuisine) throw new Error(`Cuisine with ID ${cuisineId} does not exist`);
        return cuisine;
    }
}

module.exports = new CuisineModel();