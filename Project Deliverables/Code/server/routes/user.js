const express = require('express');

const router = express.Router();

const userRouteController = require("../controllers/user");

router.post("/add-feedback", userRouteController.addFeedback);

router.get("/fetch-user-feedbacks/:id", userRouteController.fetchUserFeedbacks);

router.post("/delete-feedback", userRouteController.deleteFeedback);

router.get("/fetch-user-queries/:id", userRouteController.fetchUserQueries);

router.post("/delete-query", userRouteController.deleteQuery);

router.post("/add-user-details/:id", userRouteController.addUserDetails);

router.get("/fetch-user-details/:id", userRouteController.fetchUserDetails);

module.exports = router;