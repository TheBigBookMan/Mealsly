const tagModel = require('../models/tagModal');

class TagService {
    async getTags() {
        return await tagModel.findAllTags();
    }
}

module.exports = new TagService();