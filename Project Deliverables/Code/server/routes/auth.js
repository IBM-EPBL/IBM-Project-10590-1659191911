const express = require("express");
const router = express.Router();
const authRouteController = require("../controllers/auth");

router.post("/sign-up", authRouteController.signUp);

router.post("/sign-in", authRouteController.signIn);

router.post("/reset-password", authRouteController.resetPassword);

router.get("/auth-user/:email", authRouteController.authUser);

router.post("/update-username", authRouteController.updateUsername);

module.exports = router;