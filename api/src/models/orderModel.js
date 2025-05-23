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

    async getOrderById(orderId, includeChef = false, includeEater = false) {
        return await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderItems: {
                    include: { listing: true },
                },
                chef: includeChef,
                eater: includeEater,
            },
        });
    }

    async getOrdersByEater(eaterId, includeChef = false) {
        return await prisma.order.findMany({
            where: { eaterId },
            include: {
                orderItems: {
                    include: { listing: true },
                },
                chef: includeChef,
            },
        });
    }

    async getOrdersByChef (chefId, includeEater = false) {
        return await prisma.order.findMany({
            where: {chefId},
            include: {
                orderItems: {
                    include: {listing: true}
                },
                eater: includeEater
            }
        })
    }

    async updateOrderStatus(orderId, newStatus) {
        return await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus },
        });
    }
}

module.exports = new OrderModel();