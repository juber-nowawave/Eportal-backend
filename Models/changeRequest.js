const mongoose = require("mongoose");

const ChangeRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "EmployeeProfile",
    },
    requestedChanges: {
      checkIn: { type: Date },
      checkOut: { type: Date },
    },
    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminResponse: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ChangeRequest = mongoose.model("ChangeRequest", ChangeRequestSchema);

module.exports = ChangeRequest;
