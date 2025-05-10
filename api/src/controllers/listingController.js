const { prisma } = require('../db/prisma');
const listingService = require('../services/listingService');
const {errorHttp} = require('../utils/errors');

/*
title String
    description String
    price Float
    image String?
    available Boolean @default(true)
    createdAt DateTime @default(now())

    delivery Boolean @default(false)
    pickup Boolean @default(true)
    pickupAddressLatLon String?
*/

// TODO add in dietrytags as well when created but this will need to connect to tags created- through listingTag table

class ListingController {
    async createListing (req, res) {

    }
}

module.exports = new ListingController();