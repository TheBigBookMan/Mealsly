const cuisineModel = require("../models/cuisineModel");

class CuisineModel {
    async getCuisines() {
        return await cuisineModel.findAllCuisines();
    }

    async getExistingCuisineId (id) {
        return await cuisineModel.getExistingCuisineId(id);
    }
}

module.exports = new CuisineModel();