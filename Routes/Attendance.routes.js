// routes/authRoutes.js
const express = require("express");
const {checkIn, checkOut, getTotalDurationWeek, addHoliday, getWeekSummaryWithWeekends, getHoliday} = require("../Controllers/AttendanceController");
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware')

router.post("/checkIn",authMiddleware, checkIn );
router.post("/checkOut",authMiddleware, checkOut );
router.get("/totalDuration",authMiddleware, getTotalDurationWeek );
router.post("/addholiday", addHoliday );
router.get("/getholiday", getHoliday );
router.get("/weekSummary",authMiddleware, getWeekSummaryWithWeekends );

module.exports = router;

