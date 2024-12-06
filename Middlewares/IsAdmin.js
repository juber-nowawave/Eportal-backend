const EmployeeProfile = require("../Models/Employee");

const isAdmin = async (req, res, next) => {
  const userid = req.user._id;

  try {
    const employee = await EmployeeProfile.findById(userid);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.user_role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying admin access", error });
  }
};

module.exports = isAdmin;
