const express = require('express');
const route = express.Router();
const {postMilestone,getMilestone} = require('../Controllers/MilestoneController');
route.route('/').post(postMilestone).get(getMilestone);

module.exports = route;