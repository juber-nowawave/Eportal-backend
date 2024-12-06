const express = require('express');
const {createChecckOutDetails} = require('../Controllers/checkOutDetailsController')
const router  = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/createDetails',authMiddleware,createChecckOutDetails);

module.exports = router;