const route = require('express').Router();
const {postEmployeeDetailRequests,getAllEmployeeDetailRequests,putEmployeeDetailRequests} = require('../Controllers/EmployeeDetailsRequestController');
route.route('/requestEmployeeDetails').post(postEmployeeDetailRequests).get(getAllEmployeeDetailRequests).put(putEmployeeDetailRequests);

module.exports = route;
