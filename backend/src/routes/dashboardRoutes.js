const express = require("express");
const { mainDashboard } = require("../controllers/dashboardController");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/main-dashboard",authMiddleware, mainDashboard);

module.exports = router;
