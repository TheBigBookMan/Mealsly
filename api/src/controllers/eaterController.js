const {prisma} = require('../db');

class EaterController {
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
}


module.exports = new EaterController();