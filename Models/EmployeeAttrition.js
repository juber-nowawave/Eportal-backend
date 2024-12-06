const mongoose = require("mongoose");

const EmployeeAttritionSchema = new mongoose.Schema({
  employee_name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  branch: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  division: {
    type: String,
  },
  unit: {
    type: String,
  },
  project: {
    type: String,
  },

  birth_date: {
    type: Date,
  },
  employee_code: {
    type: String,
  },
  joining_date: {
    type: Date,
  },
  confirmation_date: {
    type: Date,
  },
  resign_offer_date: {
    type: Date,
  },
  resign_date: {
    type: Date,
  },
  left_date: {
    type: Date,
  },
  reason_of_leaving: {
    type: String,
  },
  employee_status: {
    type: String,
  },
  category: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default:true,
  },
});

const EmployeeAttrition = mongoose.model("EmployeeAttrition", EmployeeAttritionSchema);

module.exports = EmployeeAttrition;
