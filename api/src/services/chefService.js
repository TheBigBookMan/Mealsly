const chefModel = require("../models/chefModel");

class ChefService {
    async getChefs() {
        const chefs = await chefModel.findAllChefs();
        return chefs;
    }

    async getExistingChefId(id) {
        return await chefModel.getExistingChefId(id);
    }

    async getChefIncludeAll(id) {
        const chef = await chefModel.findChefIncludeAll(id);
        return chef;
    }
}

module.exports = new ChefService();