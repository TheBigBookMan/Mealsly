const chefModel = require('../models/chefModel');
const cuisineModel = require('../models/cuisineModel');
const listingModel = require('../models/listingModel');

class ListingService {
    async createListing (data, file) {
        const {title, description, price, available, cuisineId, chefId, delivery, pickup, pickupAddressLatLon} = data;

        // TODO better error handling for throwing errors to be caught in controller

        // ? Validate chef
        const chef = await chefModel.getExistingChefId(chefId);
        if(!chef) throw new Error(`Chef with ID ${chefId} does not exist`);

        // ? Validate cuisine
        const cuisine = await cuisineModel.getExistingCuisineId(cuisineId);
        if(!cuisine)  throw new Error(`Cuisine with ID ${cuisineId} does not exist`);

            // TODO need to add image to S3 bucket- need S3 util

        
        // ? Create the listing
        return await listingModel.createListing({
            title,
            description,
            price,
            cuisineId,
            chefId,
            image: imageUrl,
            available,
            delivery,
            pickup,
            pickupAddressLatLon,
            dietryTags: tagIds ? {
                create: tagIds.map(tagId => ({ tagId })),
            } : undefined,
        });
    }

    async getExistingListingById (listingId, includeCuisine = false, includeChef = false, includeTags = false) {
        return await listingModel.getListingById(listingId, includeCuisine, includeChef, includeTags);
    }

    async getListingsByCuisine (cuisineId) {
         // TODO better error handling for throwing errors to be caught in controller
        return await cuisineModel.getCuisineWithListings(cuisineId);
    }

    async getListingsByChef (chefId) {
        // TODO better error handling for throwing areas
        return await chefModel.getChefWithListings(chefId);
    }

    async getListingsByTag (tagId) {
        // TODO better error handling for throwing areas
        return await listingModel.getAllListingsByTag(tagId);
    }
}

module.exports = new ListingService();