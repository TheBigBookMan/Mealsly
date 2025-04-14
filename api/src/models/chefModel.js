import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class ChefModel {
    async findAllChefs() {
        return await prisma.chef.findMany({
            include: {user: true}
        });
    }
}