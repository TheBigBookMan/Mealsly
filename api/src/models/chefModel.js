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

    async getChefWithListings(chefId) {
        const chef = await prisma.chef.findUnique({
            where: { id: chefId },
            include: {
                listings: {
                    include: {
                        cuisine: true,
                        dietryTags: { include: { tag: true } },
                    },
                },
            },
        });

        if (!chef) throw new Error(`Chef with ID ${chefId} does not exist`);
        return chef;
    }
}

module.exports = new ChefModel();