const express = require("express");

const router = express.Router();

const commonRouteController = require('../controllers/common');

router.get("/fetch-feedbacks", commonRouteController.fetchFeedbacks);

router.post("/add-query", commonRouteController.addQuery);

router.get("/fetch-all-queries", commonRouteController.fetchAllQueries);

router.post("/add-answer", commonRouteController.addAnswer);

router.post("/delete-answer", commonRouteController.deleteAnswer);


module.exports = router;