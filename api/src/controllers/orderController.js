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
}

module.exports = new OrderController();