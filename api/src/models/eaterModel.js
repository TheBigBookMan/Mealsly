import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class EaterModel {
    async findAllEaters() {
        return await prisma.eaters.findMany({
            include: {user: true}
        });
    }

    async getExistingEaterId(id) {
        return await prisma.eater.findUnique({where: {id}});
    }

    async findEaterIncludeAll(id) {
        return await prisma.eater.findUnique({
            where: {id},
            include: {
                user: true,
                orders: true,
                itemReviews: true,
                reviews: true,
                recurringOrders: true
            }
        });
    }
}