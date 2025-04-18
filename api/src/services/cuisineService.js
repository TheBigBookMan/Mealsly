const cuisineModel = require("../models/cuisineModel");

class CuisineModel {
    async getCuisines() {
        return await cuisineModel.findAllCuisines();
    }
}

module.exports = new CuisineModel();