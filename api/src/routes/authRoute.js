// routes/user.js
const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
        }

        res.json(user);
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;