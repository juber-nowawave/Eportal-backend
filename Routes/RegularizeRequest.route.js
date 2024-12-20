const route = require('express').Router();
const {postRegulariseRequests, getRegulariseRequests , putRegulariseRequests} = require('../Controllers/RegularizeRequestController');
route.route('/requestRegularise').post(postRegulariseRequests).get(getRegulariseRequests).put(putRegulariseRequests);

module.exports = route;