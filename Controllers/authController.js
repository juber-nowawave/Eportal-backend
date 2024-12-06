const User = require("../Models/User");
const EmployeeProfile = require("../Models/Employee")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const responseHandler = require("../library/responseTemplate");

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Register user
// exports.register = async (req, res) => {
//   const { first_name, last_name, email, user_role, password } = req.body;
//   if (!email || !password || !first_name || !last_name || !user_role) {
//     return res
//       .status(400)
//       .json(responseHandler(0, 400, "All fields are required"));
//   }

//   try {
//     res.setHeader('Content-Type', 'application/json');
//     if (await User.findOne({ email })) {
//       return res.json(responseHandler(0, 400, "User with this email already exists"));
//     }

//     const hashedPassword = await hashPassword(password);
//     const user = await User.create({
//       first_name,
//       last_name,
//       email,
//       user_role,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "4h",
//     });

//     return res.json(
//       responseHandler(1, 200, "User registered successfully", { token, user })
//     );
//   } catch (error) {
//     return res.json(responseHandler(0, 500, "Error creating user", error.message));
//   }
// };

// Update user
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { first_name, last_name, email, user_role, password } = req.body;

//   try {
//     res.setHeader('Content-Type', 'application/json');
//     const user = await User.findById(id);
//     if (!user)
//       return res.status(404).json(responseHandler(0, 404, "User not found"));

//     user.first_name = first_name || user.first_name;
//     user.last_name = last_name || user.last_name;
//     user.email = email || user.email;
//     user.user_role = user_role || user.user_role;

//     if (password) {
//       user.password = await hashPassword(password);
//     }

//     await user.save();
//     return res.json(responseHandler(1, 200, "User updated successfully", user));
//   } catch (error) {
//     return res
//       .status(500)
//       .json(responseHandler(0, 500, "Error updating user", error.message));
//   }
// };

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const users = await EmployeeProfile.find();
    if (!users.length) {
      return res.status(404).json(responseHandler(0, 404, "No users found"));
    }

    return res.json(
      responseHandler(1, 200, "Users fetched successfully", users)
    );
  } catch (error) {
    return res
      .status(500)
      .json(responseHandler(0, 500, "Error fetching users", error.message));
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    res.setHeader('Content-Type', 'application/json');
    const user = await EmployeeProfile.findById(id);
    if (!user)
      return res.status(404).json(responseHandler(0, 404, "User not found"));

    return res
      .status(200)
      .json(responseHandler(1, 200, "User retrieved successfully", user));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseHandler(0, 500, "Error fetching user by ID", error.message)
      );
  }
};

// Delete user by ID
// exports.deleteUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     res.setHeader('Content-Type', 'application/json');
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser)
//       return res.status(404).json(responseHandler(0, 404, "User not found"));

//     return res
//       .status(200)
//       .json(responseHandler(1, 200, "User deleted successfully", deletedUser));
//   } catch (error) {
//     return res
//       .status(500)
//       .json(responseHandler(0, 500, "Error deleting user", error.message));
//   }
// };

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json(responseHandler(0, 400, "Email and password are required"));
  }

  try {
    res.setHeader('Content-Type', 'application/json');
    const user = await EmployeeProfile.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json(responseHandler(0, 400, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json(responseHandler(0, 400, "Invalid credentials"));

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    return res.json(
      responseHandler(1, 200, `Welcome back, ${user.firstName || "User"}`, {
        token,
        user,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(responseHandler(0, 500, "Server error", error.message));
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json(
        responseHandler(
          0,
          400,
          "New password and confirm password are required"
        )
      );
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json(
        responseHandler(
          0,
          400,
          "New password and confirm password do not match"
        )
      );
  }

  try {
    res.setHeader('Content-Type', 'application/json');
    const user = await EmployeeProfile.findOne({ email });
    if (!user)
      return res.status(404).json(responseHandler(0, 404, "User not found"));

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.isFirstLogin = false;

    await user.save();
    return res
      .status(200)
      .json(responseHandler(1, 200, "Password changed successfully", user));
  } catch (error) {
    return res
      .status(500)
      .json(responseHandler(0, 500, "Server error", error.message));
  }
};

// Get current user profile
exports.getMyProfile = (req, res) => {
  res.json(
      responseHandler(1, 200, "User profile retrieved successfully", req.user)
    );
};
