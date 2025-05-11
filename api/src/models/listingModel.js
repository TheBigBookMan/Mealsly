const {prisma} = require('../db/prisma');

class ListingModel {
    async findListingById(listingId, includeCuisine = false, includeChef = false, includeTags = false) {
        return prisma.listing.findUnique({
            where: {id: listingId},
            include: {
                cuisine: includeCuisine,
                chef: includeChef,
                dietryTags: {include: {tag: includeTags}}
            }
        })
    }

    async findAllListingsByCuisine(cuisineId) {
        return prisma.listing.findMany({
            where: {cuisineId},
            include: {
                chef: true,
                dietryTags: {include: {tag: true}}
            }
        });
    }

    async findAllListingsByChef(chefId) {
        return prisma.listing.findMany({
            where: {chefId},
            include: {
                cuisine: true,
                dietryTags: {include: {tag: true}}
            }
        });
    }

    async findAllListingsByTag(tagId) {
        return await prisma.listing.findMany({
            where: {
                dietryTags: {
                    some: {
                        tagId: tagId,
                    },
                },
            },
            include: {
                cuisine: true,
                chef: true,
                dietryTags: {
                    include: { tag: true },
                },
            },
        });
    }

    async createListing(data) {
        return await prisma.listing.create({
            data,
            include: {
                dietryTags: {
                    include: { tag: true },
                },
            },
        });
    }
}

module.exports = new ListingModel();