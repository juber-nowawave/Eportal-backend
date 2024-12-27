const route = require('express').Router();
const {postRequests,getAllRequests,putRequests,updateByAdmin} = require('../Controllers/AttendenceTypeRequestController');
route.route('/requestEditAttendenceType').post(postRequests).get(getAllRequests).put(putRequests);
route.route('/attendenceTypeUpdateByAdmin').put(updateByAdmin);

module.exports = route;