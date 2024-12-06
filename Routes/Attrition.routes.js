const express = require("express");
const {createAttrition, getAllAttrition, getSpecificAttrition , deleteAttrition} = require("../Controllers/attritionController")
const router = express.Router();

router.post("/createAttrition", createAttrition);
router.get("/getAttrition", getAllAttrition);
router.get("/getSpecificAttrition",getSpecificAttrition);
router.post('/deleteAttrition',deleteAttrition);
module.exports = router;
