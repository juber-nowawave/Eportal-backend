const route = require('express').Router();
const {postRequests,getAllRequests} = require('../Controllers/AttendenceTypeRequestController');
route.route('/requestEditAttendenceType').post(postRequests).get(getAllRequests);

module.exports = route;