const { prisma } = require('../db/prisma');
const { errorHttp } = require('../utils/errors');

class MapController {
    async getChefsByLatLon (req, res) {
        const {neLat, neLng, swLat, swLng} = req.params;
    }
}

module.exports = new MapController();