// routes/authRoutes.js
const express = require("express");
const {createEmployee, getAllEmployees, getSpecificEmployees ,deleteEmployee } = require("../Controllers/EmployeeController");
const router = express.Router();

router.post("/createEmployee", createEmployee);
router.get("/getEmployee", getAllEmployees);
router.get("/specificEmployee",getSpecificEmployees);
router.post("/deleteEmployee", deleteEmployee );

module.exports = router;
