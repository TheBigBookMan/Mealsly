import { EaterModel } from "../models/eaterModel";

const eaterModel = new EaterModel();

export class EaterService {
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