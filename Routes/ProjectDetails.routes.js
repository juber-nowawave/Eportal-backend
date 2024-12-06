// routes/authRoutes.js
const express = require("express");
const { createProjectDetails, getAllProjectDetails, deleteProjects, updateProjectStatus, getUserProjects } = require("../Controllers/ProjectDetails.Controller");
const authMiddleware = require('../Middlewares/authMiddleware')
const router = express.Router();

router.post("/createProjectDetails", createProjectDetails);
router.post("/updateProjectStatus", updateProjectStatus);
router.get("/getProjectDetails", getAllProjectDetails);
router.post("/deleteProjects/:id", deleteProjects);
router.get("/getUserProjects", authMiddleware, getUserProjects);

module.exports = router;
