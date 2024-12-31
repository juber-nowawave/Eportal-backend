const express = require('express');
const {postLeaveBalanceRecords,getLeaveBalanceRecords,putLeaveBalanceRecords} = require('../Controllers/LeaveBalanceRecordsController');
const router = express.Router();
router.route('/records').post(postLeaveBalanceRecords).get(getLeaveBalanceRecords).put(putLeaveBalanceRecords);

module.exports = router;