const {prisma} = require('../db/prisma');

class OrderModel {
    async createOrder(data) {
        return await prisma.order.create({
            data,
            include: {
                orderItems: {
                    include: { listing: true },
                },
                chef: true,
                eater: true,
            },
        });
    }
}

module.exports = new OrderModel();