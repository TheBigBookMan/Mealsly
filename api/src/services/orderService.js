const orderModel = require('../models/orderModel');

class OrderService {
    async createOrder(data) {
        const { eaterId, chefId, orderItems } = data;

        // TODO make sure better error handling in the errorHttp in controller
        if (!orderItems || orderItems.length === 0) {
            throw new Error("Order must have at least one item", 400);
        }

        // TODO this would also need to make sure there is inventory of the items in the chefs inventory, if not then rejected
        
        // TODO also need to remove an item from the inventory based on quantities purchased for each listing item 

        // ? Get total price for order items
        const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // TODO would this also have some sort of stripe API call to give ius a percent of the order?
        
        // TODO also this would need to double check that the money comes out of the eater stripe accoint and money is in there, if not then rejected


        return await orderModel.createOrder({
            eaterId,
            chefId,
            totalPrice,
            status: "PENDING",
            orderItems: {
                create: orderItems.map(item => ({
                    listingId: item.listingId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        });
    }

    async getOrderById (orderId, includeChef = false, includeEater = false) {
        return await orderModel.getOrderById(orderId, includeChef, includeEater);
    }

    async getOrdersByEater(eaterId, includeChef = false) {
        return await orderModel.getOrdersByEater(eaterId, includeChef);
    }

    async getOrdersByChef(chefId, includeEater = false) {
        return await orderModel.getOrdersByChef(chefId, includeEater);
    }

    async updateOrderStatus(orderId, newStatus) {
        const order = await this.getOrderById(orderId);

        const VALID_ORDER_STATUS_TRANSITIONS = {
            PENDING: ["CONFIRMED", "CANCELLED"],
            CONFIRMED: ["PREPARING", "CANCELLED"],
            PREPARING: ["READY", "CANCELLED"],
            READY: ["COMPLETED", "CANCELLED"],
            COMPLETED: [],
            CANCELLED: [],
        };

        const currentStatus = order.status;
        const validNextStatuses = VALID_ORDER_STATUS_TRANSITIONS[currentStatus];

        if (!validNextStatuses.includes(newStatus)) {
            throw new AppError(
                `Invalid status transition from ${currentStatus} to ${newStatus}`,
                400
            );
        }

        return await orderModel.updateOrderStatus(orderId, newStatus);
    }
}

module.exports = new OrderService();