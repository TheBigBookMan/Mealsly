const {prisma} = require('../db');

class EaterController {
    async createEater (req, res) {
        const {
            firebaseUid,
            email,
            firstName,
            lastName,
            postcode,
            suburb,
            state
        } = req.body;

        try {

            const userExists = await prisma.user.findUnique({
                where: {
                    OR: [{firebaseUid}, {email}]
                }
            });

            if(userExists) return res.status(400).json({message: 'User already exists'});

            const user = await prisma.user.create({
                data: {
                    firebaseUid,
                    email,
                    firstName,
                    lastName,
                    postcode,
                    suburb,
                    state
                }
            });

            const eater = await prisma.eater.create({
                data: {
                    userId: user.id,
                },
                include: {
                    user: true
                }
            });

            return res.status(201).json({success: true, eater});

        } catch(error) {
            console.error('Could not create Eater', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    }

    async getAllEaters (req, res) {
        try {

            const eaters = await prisma.eaters.findMany({
                include: {user: true}
            });

            res.json(eaters);

        } catch(error) {
            console.error('Could not get all eaters', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    }

    async getEaterById (req, res) {
        const {id} = req.params;

        try {

            const eater = await prisma.eater.findUnique({
                where: {id},
                include: {
                    user: true,
                    orders: true,
                    itemReviews: true,
                    reviews: true,
                    recurringOrders: true
                }
            });

            if(!eater) return res.status(404).json({message: 'Eater not found.'});

            res.json(eater);

        } catch(error) {
            console.error('Could not get eater by Id', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    };

    async updateEaterDetails (req, res) {
        const {id} = req.params;
        const {postcode,
            suburb,
            state} = req.body;

        try {

            const eaterExists = await prisma.eater.findUnique({where: {id}});

            if(!eaterExists) return res.status(404).json({message: 'Eater not found'});

            const updatedEater = await prisma.eater.update({
                where: {id},
                data: {

                    user: {
                        update: {
                            ...(postcode && {postcode}),
                            ...(suburb && {suburb}),
                            ...(state && {state})
                        }
                    }
                },
                include: {
                    user: true
                }
            });

            res.json({success: true, eater: updatedEater});

        } catch(error) {
            console.error('Could not update eater details', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    };

    // TODO probably never use this as cascading issues can be troubling
    async deleteEaterById (req, res) {
        const {id} = req.params;

        try {
            
            const eaterExists = await prisma.eater.findUnique({where: {id}});

            if(!eaterExists) return res.status(404).json({message: 'Eater not found'});

            const deletedEater = await prisma.eater.delete({
                where: {id}
            });

            return res.json({success: true, message: 'Eater deleted', eater: deletedEater});

        } catch (error) {
            console.error('Could not delete eater by ID', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    }

    async getEaterProfilePic (req, res) {
        const {id} = req.params;
        // TODO will get from S3 bucket
    }

    async updateEaterProfilePic (req, res) {
        const {id} = req.params;
        // TODO this will update current S3 bucket with picture
    }

    async deleteEaterProfilePic (req, res) {
        const {id} = req.params;
        // TODO this will delete the profile pic URL, maybe from S3 bucket as well?
    };

    async getEaterLatLon (req, res) {
        const {id} = req.params;

        try {
            
            const latlon = await prisma.eater.findUnique({
                where: {id},
                select: {
                    latitude: true,
                    longitude: true
                }
            });

            if(!latlon) return res.status(404).json({message: 'Eater not found.'});

            return res.json(latlon);

        } catch (error) {
            console.error('Could not get eater lat lon', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    }

    async updateEaterLatLon (req, res) {
        const {id} = req.params;
        const {latitude, longitude} = req.body;

        try {
            
            const eaterExists = await prisma.eater.findUnique({where: {id}});

            if(!eaterExists) return res.status(404).json({message: 'Eater not found.'});

            const updatedEaterLatLon = await prisma.eater.update({
                where: {id},
                data: {
                    latitude,
                    longitude
                }
            });

            return res.json({success: true, message: 'Successfully updated eater lat and lon', updatedEater: updatedEaterLatLon});

        } catch (error) {
            console.error('Could not update eater lat lon', error);
            res.status(500).json({message: 'Something went wrong.'});
        }
    }
}


module.exports = new EaterController();