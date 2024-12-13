const route = require('express').Router();
const {postRequests,getAllRequests,putRequests} = require('../Controllers/AttendenceTypeRequestController');
route.route('/requestEditAttendenceType').post(postRequests).get(getAllRequests).put(putRequests);

module.exports = route;