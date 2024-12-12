const route = require('express').Router();
const {postLeaveRequests,getAllLeaveRequests} = require('../Controllers/LeaveApplyRequestsController');
route.route('/requestLeave').post(postLeaveRequests).get(getAllLeaveRequests);

module.exports = route;