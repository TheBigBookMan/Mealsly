const {prisma} = require('../db/prisma');

class ChefModel {
    async findAllChefs() {
        return await prisma.chef.findMany({
            include: {user: true}
        });
    }

    async getExistingChefId(id) {
        return await prisma.chef.findUnique({where: {id}});
    }

    async findChefIncludeAll(id) {
        return await prisma.chef.findUnique({
            where: { id },
            include: {
                user: true,
                listings: true,
                itemReviews: true,
                chefReviews: true
            }
        });
    }
}

module.exports = new ChefModel();