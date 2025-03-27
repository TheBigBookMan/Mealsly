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
    }
}


module.exports = new EaterController();