const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware')
const {postBiometricAttendence,getBiometricAttendence, getTotalDurationWeek ,editAttendenceType} = require('../Controllers/biometricAttendenceController');
// router.post("/checkIn",authMiddleware, checkIn );
// router.post("/checkOut",authMiddleware, checkOut );
// router.get("/totalDuration",authMiddleware, getTotalDurationWeek );
// router.post("/addholiday", addHoliday );
// router.get("/getholiday", getHoliday );
// router.get("/weekSummary",authMiddleware, getWeekSummaryWithWeekends );

router.route('/attendence').post(postBiometricAttendence).get(getBiometricAttendence);
router.get("/totalDuration",authMiddleware, getTotalDurationWeek);
router.put('/editAttendenceType',editAttendenceType);

module.exports = router;
