const { prisma } = require('../db/prisma');
const orderService = require('../services/orderService');
const {errorHttp} = require('../utils/errors');

class OrderController {
    async createOrder (req, res) {
        try {
            const order = await orderService.createOrder(req.body);
            return res.status(201).json({success: true, order});
        } catch(err) {
            errorHttp(res, err, 'Could not create order', 500);
        }
    }

    async getOrderById (req, res) {
        const {orderId} = req.params;
        const includeChef = req.query.includeChef === 'true';
        const includeEater = req.query.includeEater === 'true';

        try {
            const order = await orderService.getOrderById(orderId, includeChef, includeEater);
            res.json(order);
        } catch(err) {
            errorHttp(res, err, 'Could not get order by Id', 500);
        }
    }

    async getOrdersByEater (req, res) {
        const {eaterId} = req.params;
        const includeChef  = req.query.includeChef === 'true';

        try {
            const orders = await orderService.getOrdersByEater(eaterId, includeChef);
            res.json(orders);
        } catch(err) {
            errorHttp(res, err, 'Could not get orders by eater', 500);
        }
    }

    async getOrdersByChef (req, res) {
        const {chefId} = req.params;
        const includeEater = req.query.includeEater === 'true';

        try {
            const orders = await orderService.getOrdersByChef(chefId, includeEater);
            res.json(orders);
        } catch(err) {
            errorHttp(res, err, 'Could not get orders by chef', 500);
        }
    }

    async updateOrderStatus (req, res) {
        const {orderId} = res.params;
        const orderStatus = req.query.orderStatus;

        try {   
            const order = await orderService.updateOrderStatus(orderId, orderStatus);
            res.status(204).json(order);
        } catch(err) {
            errorHttp(res, err, 'Could not update order status', 500);
        }
    }
}

module.exports = new OrderController();