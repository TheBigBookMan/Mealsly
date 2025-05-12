const { prisma } = require('../db/prisma');
const listingService = require('../services/listingService');
const {errorHttp} = require('../utils/errors');

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
        const includeCuisine = req.query.includeCuisine === 'true';
        const includeChef = req.query.includeChef === 'true';
        const includeTag = req.query.includeTag === 'true';

        try {
            const listing = await listingService.getExistingListingById(listingId, includeCuisine, includeChef, includeTag);

            if(!listing) return errorHttp(res, `Existing: ${listingId}`, 'Listing does not exist', 400);

            res.json(listing);
        } catch(err) {
            errorHttp(res, err, 'Error getting listing', 500);
        }
    }

    async getListingsByCuisine (req, res) {
        const {cuisineId} = req.params;

        try {
            const listings = await listingService.getListingsByCuisine(cuisineId);
            res.json(listings);
        } catch(err) {
            errorHttp(res, err, 'Error getting listings by cuisine', 500);
        }
    }

    async getListingsByChef (req, re) {
        const {chefId} = req.params;

        try {
            const listings = await listingService.getListingsByChef(chefId);
            res.json(listings);
        } catch(err) {
            errorHttp(res, err, 'Error getting listings by chef', 500);
        }
    }

    async getListingsByTag (req, res) {
        const {tagId} = req.params;

        try {
            const listings = await listingService.getListingsByTag(tagId);
            res.json(listings);
        } catch(err) {
            errorHttp(res, err, 'Error getting listings by tag', 500);
        }
    }
}

module.exports = new ListingController();