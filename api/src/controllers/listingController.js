const { prisma } = require('../db/prisma');
const listingService = require('../services/listingService');
const chefModel = require('../models/chefModel');
const {errorHttp} = require('../utils/errors');
const cuisineModel = require('../models/cuisineModel');

// TODO add in dietrytags as well when created but this will need to connect to tags created- through listingTag table

class ListingController {
    async createListing (req, res) {
        const {title, description, price, available, cuisineId, chefId, delivery, pickup, pickupAddressLatLon} = req.body;

        try {
            // TODO install a file manager package
            const listing = await listingService.createListing(
                {title, description, price, available, cuisineId, chefId, delivery, pickup, pickupAddressLatLon, tagIds},
                req.file
            );
            return res.status(201).json({ success: true, listing});
        } catch(err) {
            errorHttp(res, err, 'Error creating listing', 500);
        }
    }

    async getListingById (req, res) {
        const {listingId} = req.params;

        try {
            const listing = await listingService.getListingById(listingId);
            return res.status(200).json({success: true, listing});
        } catch(err) {
            errorHttp(res, err, 'Error getting listing', 500);
        }
    }

    async getListingsByCuisine (req, res) {
        const {cuisineId} = req.params;

        try {
            const listings = await listingService.getListingsByCuisine(cuisineId);
            return res.status(200).json({success: true, listings});
        } catch(err) {
            errorHttp(res, err, 'Error getting listings by cuisine', 500);
        }
    }
}

module.exports = new ListingController();