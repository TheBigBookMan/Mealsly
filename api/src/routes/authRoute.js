// routes/user.js
const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {errorHttp} = require('../utils/errors');

// ? Login with google or facebook and create user as an eater if not already
router.post("/login", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name, picture } = req.firebaseUser;

    try {
        let user = await prisma.user.findUnique({ where: { firebaseUid: uid }, include: {eater: true} });

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
                    eater: {
                        create: {},
                    },
                },
                include: { eater: true },
            });
        }

        res.json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
            postcode: user.postcode,
            suburb: user.suburb,
            state: user.state,
            eaterId: user.eater?.id || null,
            createdAt: user.createdAt
        });
    } catch (error) {
        errorHttp(res, error, "Error in /login:", 500);
    }
});

// ? Login as eater with email and password and create eater if not already existing
router.post("/login-email", async (req, res) => {
    const {email, password} = req.body;

    try {

        // TODO need to look into how the firebaseUID will be created and stored when using email and password not google and facebook

        // let user = await prisma.user.findUnique({ where: { email: email } });

        // if(!user) {
        //     user = await prisma.user.create({
        //         data: {

        //         }
        //     })
        // }

    } catch(error) {
        errorHttp(res, error, "Error in /login-email:", 500);
    }
})

// ? Login with google or facebook and create user as a chef if not already existing
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