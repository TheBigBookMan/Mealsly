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

    async createTag (req, res) {
        const {name, description} = req.body;
        
        try {

            const tag = await prisma.tag.create({
                data: {
                    name,
                    description: description ? description : ''
                }
            });

            // TODO do the prisma check for insert duplicate code
            
            return res.status(201).json({success: true, tag});

        } catch(err) {
            errorHttp(res, err, 'Error creating tag', 500);
        }
    }
}

module.exports = new TagController();