const express = require('express');
const {postLeave,getLeave} = require('../Controllers/leaveController');
const router = express.Router();
router.post('/applyleave',postLeave);
router.get('/allLeavelist',getLeave);

module.exports = router;