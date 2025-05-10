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

    async findAllListingsByChef(chefId) {
        return prisma.listing.findMany({
            where: {chefId},
            include: {
                cuising: true,
                dietryTags: {include: {tag: true}}
            }
        });
    }

    async findListingById(listingId) {
        return prisma.listing.findUnique({
            where: {id: listingId},
            include: {
                cuising: true,
                chef: true,
                dietryTags: {include: {tag: true}}
            }
        })
    }
}

module.exports = new ListingModel();