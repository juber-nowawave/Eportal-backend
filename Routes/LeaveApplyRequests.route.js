const route = require('express').Router();
const {postLeaveRequests,getAllLeaveRequests , putLeaveRequests} = require('../Controllers/LeaveApplyRequestsController');
route.route('/requestLeave').post(postLeaveRequests).get(getAllLeaveRequests).put(putLeaveRequests);

module.exports = route;