const { prisma } = require('../db/prisma');
const listingService = require('../services/listingService');
const chefModel = require('../models/chefModel');
const {errorHttp} = require('../utils/errors');
const cuisineModel = require('../models/cuisineModel');

// TODO add in dietrytags as well when created but this will need to connect to tags created- through listingTag table

class ListingController {
    async createListing (req, res) {
        const {title, description, price, image, available, cuisineId, chefId, delivery, pickup, pickupAddressLatLon} = req.body;

        try {

            const chef = await chefModel.getExistingChefId(chefId);
            if(!chef) return errorHttp(res, `ChefId: ${chefId}`, 'Chef does not exist', 400);

            const cuisine = await cuisineModel.getExistingCuisineId(cuisineId);
            if(!cuisine) return errorHttp(res, `CuisineId: ${cuisineId}`, 'Cuisine does not exist', 400);

            // TODO need to add image to S3 bucket

            await listingModel.create({
                title,
                description,
                price,
                cuisineId,
                chefId,
                image,
                delivery,
                pickup,
                pickupAddressLatLon,
                available
            });

            return res.status(201).json({ success: true, listing});
            
        } catch(err) {
            errorHttp(res, err, 'Error creating listing', 500);
        }
    }
}

module.exports = new ListingController();