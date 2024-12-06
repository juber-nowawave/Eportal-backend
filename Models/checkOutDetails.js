const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "EmployeeProfile",
  },
  date: {
    type: Date,
    required: true,
  },
  project: [
    {
      projectId: {
        type: String,
        required: true,
        ref: "ProjectDetails",
      },
      projectName: {
        type: String,
        required: true,
      },
      Update: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    }
  ],
});

const CheckOut = mongoose.model("CheckOut", checkoutSchema);

module.exports = CheckOut;
