const cuisineModel = require("../models/cuisineModel");

class CuisineService {
    async getCuisines(includeChefs = false) {
        return await cuisineModel.findAllCuisines(includeChefs);
    }

    async getExistingCuisineId (id, includeChefs = false) {
        return await cuisineModel.getExistingCuisineId(id, includeChefs);
    }
}

module.exports = new CuisineService();