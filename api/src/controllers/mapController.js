const { prisma } = require('../db/prisma');
const { errorHttp } = require('../utils/errors');

class MapController {
    async getChefsByLatLon (req, res) {
        const {neLat, neLng, swLat, swLng} = req.query;

        try {

            const chefs = await prisma.chef.findMany({
                where: {
                    latitude: {
                        gte: Number(swLat),
                        lte: Number(neLat),
                    },
                    longitude: {
                        gte: Number(swLng),
                        lte: Number(neLng),
                    },
                    isActive: true,
                },
                include: {
                    user: true,
                },
            });

            return res.json(chefs);

        } catch(err) {
            errorHttp(res, err, 'Error getting lat lon for chefs:', 500);
        }
    }
}

module.exports = new MapController();