const { prisma } = require('../db');

class ChefController {
    async createChef (req, res) {
        // TODO this will have specific body paramaters to match the model fields
        const {email, firebaseUid} = req.body;

        try {

            const userExists = await prisma.user.findUnique({
                where: {
                    OR: [{firebaseUid}, {email}]
                }
            });

            if(userExists) {
                return res.status(400).json({message: 'User already exists'});
            }

            

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

            if (!chef) {
                return res.status(404).json({ message: 'Chef not found' });
            }

            res.json(chef);
        } catch (error) {
            console.error('Error fetching chef:', error);
            res.status(500).json({ message: 'Something went wrong', error });
        }
    };

    async becomeInactive (res, req) {
        const {id} = req.params;

        try {

            const chefExists = await prisma.chef.findUnique({where: {id}});

            if(!chefExists) {
                return res.status(404).json({message: 'Chef not found'});
            }

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

module.exports = new ChefController;