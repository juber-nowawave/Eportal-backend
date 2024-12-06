const Project = require("../Models/ProjectDetails");
const responseHandler = require("../library/responseTemplate");

exports.createProjectDetails = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const { _id } = req.body;
    let project;

    if (_id) {
      project = await Project.findById(_id);

      if (project) {
        req.body.interested = true;
        // If project exists, update it
        project = await Project.findByIdAndUpdate(_id, req.body, { new: true });
        return res.json(
          responseHandler(1, 200, "Project updated successfully", project)
        );
      }
    }
    // If no ID is provided or the project doesn't exist, create a new one
    project = new Project(req.body);
    await project.save();
    res.json(responseHandler(1, 200, "Project created successfully", project));
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};

exports.getAllProjectDetails = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const projects = await Project.find({ active: true });
    if (projects.length === 0) {
      return res.json(responseHandler(0, 200, "No projects found."));
    }
    return res.json(
      responseHandler(1, 200, "Projects retrieved successfully", projects)
    );
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};

exports.deleteProjects = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;

    // Update the project to set active to false instead of deleting
    const result = await Project.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );

    if (!result) {
      return res.json(
        responseHandler(0, 404, "No project found with the given id.")
      );
    }
    return res.json(
      responseHandler(1, 200, "Project marked as inactive successfully", result)
    );
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error.", error.message));
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { id, projectStatus } = req.body;

    const result = await Project.findByIdAndUpdate(
      id,
      { projectStatus: projectStatus },
      { new: true }
    );

    if (!result) {
      return res.json(responseHandler(0, 404, "Project not found."));
    }

    res.json(
      responseHandler(1, 200, "Project status updated successfully.", result)
    );
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error.", error.message));
  }
};

exports.getUserProjects = async(req, res) => {
  const userId = req.user._id.toString(); // Ensure the userId is a string if it is stored as ObjectId
  try {
    const projects = await Project.find({
      "resources.assignedTo.value": userId, // Searching within the array of assignedTo objects
    }).select('_id projectName');

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this user.' });
    }

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
