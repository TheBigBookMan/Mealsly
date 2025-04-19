const { prisma } = require('../db/prisma');
const userService = require('../services/userService');
const { errorHttp } = require('../utils/errors');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class UserController {
    async createStripeSetupIntent (req, res) {
        const { uid } = req.firebaseUser;

        try {
            const user = await prisma.user.findUnique({ where: { firebaseUid: uid  } });

            if (!user) return res.status(404).json({ message: "User not found" });

            let stripeCustomerId = user.stripeCustomerId;

            if (!stripeCustomerId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                });

                stripeCustomerId = customer.id;
            
                await prisma.user.update({
                    where: { id: user.id },
                    data: { stripeCustomerId },
                });
            }

            const setupIntent = await stripe.setupIntents.create({
                customer: stripeCustomerId,
            });
        
            return res.json({ clientSecret: setupIntent.client_secret });
        } catch (err) {
            errorHttp(res, err, 'Error creating stripe setup intent', 500);
        }
    }
}

module.exports = new UserController();