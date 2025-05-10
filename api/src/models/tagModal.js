const {prisma} = require('../db/prisma');

class TagModel {
    async findAllTags() {
        return await prisma.tag.findMany();
    }
}

module.exports = new TagModel();