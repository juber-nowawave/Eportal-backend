const mongoose = require("mongoose");
const monthlyRecordSchema = new mongoose.Schema({
  openingBalance: { type: Number, required: true },
  credits: { type: Number, required: true },
  leavesTaken: { type: Number, default: 0 },
  closingBalance: { type: Number, required: true },
});


const leaveYearSchema = new mongoose.Schema({
  employeeId: { type: String, required: true ,unqiue:true},
  employeeName: { type: String, required: true },
  year: { type: Number, required: true,unqiue:true },
  monthlyRecords: {
    type: Map,
    of: monthlyRecordSchema, 
  },
  totalCredits: { type: Number, required: true, default: 0 },
  totalLeavesTaken: { type: Number, required: true, default: 0 },
  totalClosingBalance: { type: Number, required: true, default: 0 },
  adminOpeningBalance: { type: Number, required: true },
});


const leaveBalanceRecords = mongoose.model("leaveBalanceRecords", leaveYearSchema);
module.exports = {leaveBalanceRecords};
