import { ChefModel } from "../models/chefModel";

export class ChefService {
    async getChefs() {
        const chefs = await ChefModel.findAllChefs();
        return chefs;
    }
}