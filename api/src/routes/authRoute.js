// routes/user.js
const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {errorHttp} = require('../utils/errors');

// ? Create user as an eater
router.post("/login", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name, picture } = req.firebaseUser;

    try {
        let user = await prisma.user.findUnique({ where: { firebaseUid: uid } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    firebaseUid: uid,
                    email,
                    firstName: name || "User",
                    lastName: "",
                    profileImage: picture || null,
                    postcode: "",
                    suburb: "",
                    state: "",
                },
            });

            await prisma.eater.create({
                data: {
                    userId: user.id
                }
            });

            user = await prisma.user.findUnique({where: {id: user.id}, include: {eater: true}});
        }

        res.json(user);
    } catch (error) {
        errorHttp(res, error, "Error in /login:", 500);
    }
});

// ? Create user as a chef
router.post("/login-chef", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name, picture } = req.firebaseUser;

    try {
        let user = await prisma.user.findUnique({ where: { firebaseUid: uid } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    firebaseUid: uid,
                    email,
                    firstName: name || "User",
                    lastName: "",
                    profileImage: picture || null,
                    postcode: "",
                    suburb: "",
                    state: "",
                },
            });

            await prisma.chef.create({
                data: {
                    userId: user.id
                }
            });

            user = await prisma.user.findUnique({where: {id: user.id}, include: {chef: true}});
        }

        res.json(user);
    } catch (error) {
        errorHttp(res, error, "Error in /login-chef:", 500);
    }
});

module.exports = router;