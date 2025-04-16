const eaterModel = require('../models/eaterModel');

class EaterService {
    async getEaters() {
        const eaters = await eaterModel.findAllEaters();
        return eaters;
    }

    async getExistingEaterId(id) {
        return await eaterModel.getExistingEaterId(id);
    }

    async getEaterIncludeAll(id) {
        const eater = await eaterModel.findEaterIncludeAll(id);
        return eater;
    }
}

module.exports = new EaterService();