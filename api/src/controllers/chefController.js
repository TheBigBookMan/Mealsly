const { prisma } = require('../db/prisma');

class ChefController {
    async createChef (req, res) {
        const {
            firebaseUid,
            email,
            firstName,
            lastName,
            bio,
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

            const chef = await prisma.chef.create({
                data: {
                    userId: user.id,
                    bio
                },
                include: {
                    user: true
                }
            });

            return res.status(201).json({success: true, chef});

        } catch(error) {
            console.error('Error creating chef:', error);
        }
    }

    async getAllChefs (req, res) {
        try {

            const chefs = await prisma.chef.findMany({
                include: {user: true}
            })

            res.json(chefs);

        } catch(error) {
            console.error('Error fetching chefs:', error);
            res.status(500).json({message: 'Something went wrong:', error});
        }
    };

    async getChefById (req, res){
        const { id } = req.params;

        try {
            const chef = await prisma.chef.findUnique({
                where: { id },
                include: {
                    user: true,
                    listings: true,
                    itemReviews: true,
                    chefReviews: true
                }
            });

            if (!chef) return res.status(404).json({ message: 'Chef not found' });
            
            res.json(chef);
        } catch (error) {
            console.error('Error fetching chef:', error);
            res.status(500).json({ message: 'Something went wrong', error });
        }
    };

    async updateChefDetails (req, res) {
        const {id} = req.params;
        const { bio, postcode, suburb, state } = req.body;

        try {

            const chefExists = await prisma.chef.findUnique({where: {id}});

            if(!chefExists) return res.status(404).json({message: 'Chef not found.'});

            const updatedChef = await prisma.chef.update({
                where: { id },
                data: {
                    ...(bio && { bio }),
            
                    // Update user fields using nested write
                    user: {
                        update: {
                            ...(postcode && { postcode }),
                            ...(suburb && { suburb }),
                            ...(state && { state })
                        }
                    }
                },
                include: {
                    user: true
                }
            });

            res.json({ success: true, chef: updatedChef });

        } catch(error) {
            console.error(`Error updating chef information:`, error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    };

    // TODO probably never use this as cascading issues can be troubling
    async deleteChefById (req, res) {
        const {id} = req.params;

        try {

            const existingChef = await prisma.chef.findUnique({where: {id}});

            if(!existingChef) return res.status(404).json({message: 'Chef not found.'});

            const deletedChef = await prisma.chef.delete({
                where: {id}
            });

            return res.json({success: true, message: 'Chef deleted', chef: deletedChef});

        } catch(error) {
            console.error('Error deleting chef:', error);
            res.status(500).json({message: 'Something went wrong:', error});
        }
    }

    async getChefProfilePic (req, res) {
        const {id} = req.params;
        // TODO will get from S3 bucket
    };

    async updateChefProfilePic (req, res) {
        const {id} = req.params;
        // TODO this will update the current S3 bucket with picture
    }

    async deleteChefProfilePic (req, res) {
        const {id} = req.params;
        // TODO this will delete the profile pic URL, maybe from S3 bucket as well?
    }

    async getChefLatLon (req, res) {
        const {id} = req.params;

        try {

            const latlon = await prisma.chef.findUnique({
                where: {id},
                select: {
                    latitude: true,
                    longitude: true
                }
            });

            if(!chef) return res.status(404).json({message: 'Chef not found'});

            return res.json(latlon);

        } catch(error) {
            console.error('Error getting lat lon:', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    };

    async updateChefLatLon (req, res) {
        const {id} = req.params;
        const {latitude, longitude} = req.body;

        try {

            const chefExists = await prisma.chef.findUnique({where: {id}});

            if(!chefExists) return res.status(404).json({message: 'Chef not found.'});

            const updatedChefLatLon = await prisma.chef.update({
                where: {id},
                data: {
                    latitude,
                    longitude
                }
            });

            return res.json({success: true, message: 'Successfully updated chef lat lon.', updatedChef: updatedChefLatLon});

        } catch(error) {
            console.error('Error updating chef lat lon', error);
            res.status(500).json({message: 'Something went wrong', error});
        }
    }

    async becomeInactive (req, res) {
        const {id} = req.params;

        try {

            const chefExists = await prisma.chef.findUnique({where: {id}});

            if(!chefExists) return res.status(404).json({message: 'Chef not found'});

            const newActive = !chefExists.isActive;

            await prisma.chef.update({
                where: {id},
                data: {
                    isActive: newActive
                }
            });

            return res.json({
                success: true,
                message: `Availability toggled to ${newActive}`,
                availableForPickup: newActive
            });

        } catch(error) {
            console.error('Error changing to inactive:', error);
            res.status(500).json({message: 'Something went wrong.', error});
        }
    }
}

module.exports = new ChefController();