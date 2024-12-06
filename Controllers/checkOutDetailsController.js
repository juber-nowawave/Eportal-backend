const checkOutDetails = require("../Models/checkOutDetails");
const Project = require("../Models/ProjectDetails");

exports.createChecckOutDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date, projects } = req.body;

    const projectData = await Promise.all(
      projects.map(async ({ projectId, Update, time }) => {
        const project = await Project.findById(projectId);
        if (!project) {
          throw new Error(`Project with ID ${projectId} not found`);
        }
        
        return {
          projectId,
          projectName: project.projectName,
          Update,
          time,
        };
      })
    );

    const newCheckOut = new checkOutDetails({
      userId,
      date,
      project: projectData,
    });

    await newCheckOut.save();
    res.status(201).json({ message: "Check-out recorded successfully", data: newCheckOut });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
