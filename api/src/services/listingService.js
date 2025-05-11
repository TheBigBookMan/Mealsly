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
}

module.exports = new ListingService();