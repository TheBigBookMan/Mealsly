const {prisma} = require('../db/prisma');

class ListingModel {
    async findAllListingsByCuisine(cuisineId) {
        return prisma.listing.findMany({
            where: {cuisineId},
            include: {
                cuisine: true,
                chef: true,
                dietryTags: {include: {tag: true}}
            }
        });
    }

}

module.exports = new ListingModel();