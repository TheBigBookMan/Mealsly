const {prisma} = require('../db/prisma');
const tagService = require('../services/tagService');
const {errorHttp} = require('../utils/errors');

class TagController {
    async getAllTags (req, res) {
        try {
            const tags = await tagService.getTags();
            res.json(tags);
        } catch(err) {
            errorHttp(res, err, 'Error fetching tags:', 500);
        }
    }
}

module.exports = new TagController();