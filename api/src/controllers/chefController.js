const { prisma } = require('../db/prisma');
const { ChefService } = require('../services/chefService');
const { errorHttp } = require('../utils/errors');

const chefService = new ChefService();

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
            errorHttp(res, error, 'Error creating chef:', 500);
        }
    }

    async getAllChefs (req, res) {
        try {
            const chefs = await chefService.getChefs();
            res.json(chefs);
        } catch(error) {
            errorHttp(res, error, 'Error fetching chefs:', 500);
        }
    };

    async getChefById (req, res){
        const { id } = req.params;

        try {
            const chef = await chefService.getChefIncludeAll(id);

            if (!chef) return res.status(404).json({ message: 'Chef not found' });
            
            res.json(chef);
        } catch (error) {
            errorHttp(res, error, 'Error fetching chef:', 500);
        }
    };

    async updateChefDetails (req, res) {
        const {id} = req.params;
        const { bio, postcode, suburb, state } = req.body;

        try {

            const chefExists = await chefService.getExistingChefId(id);

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
            errorHttp(res, error, 'Error updating chef information:', 500);
        }
    };

    // TODO probably never use this as cascading issues can be troubling
    async deleteChefById (req, res) {
        const {id} = req.params;

        try {

            const chefExists = await chefService.getExistingChefId(id);

            if(!chefExists) return res.status(404).json({message: 'Chef not found.'});

            const deletedChef = await prisma.chef.delete({
                where: {id}
            });

            return res.json({success: true, message: 'Chef deleted', chef: deletedChef});

        } catch(error) {
            errorHttp(res, error, 'Error deleting chef:', 500);
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
            errorHttp(res, error, 'Error getting lat lon:', 500);
        }
    };

    async updateChefLatLon (req, res) {
        const {id} = req.params;
        const {latitude, longitude} = req.body;

        try {

            const chefExists = await chefService.getExistingChefId(id);

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
            errorHttp(res, error, 'Error updating chef lat lon:', 500);
        }
    }

    async becomeInactive (req, res) {
        const {id} = req.params;

        try {

            const chefExists = await chefService.getExistingChefId(id);

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
            errorHttp(res, error, 'Error changing to inactive:', 500);
        }
    }
}

module.exports = new ChefController();