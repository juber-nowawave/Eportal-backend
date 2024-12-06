const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    projectStatus: {
      type: Number,
      default: 0,
    },
    projectType: {
      type: String,
    },
    source: {
      type: String,
    },
    representative: {
      type: String,
    },
    clientName: {
      type: String,
    },
    projectDetails: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    firstTalkDate: {
      type: Date,
    },
    sendEmail: {
      type: Boolean,
      default: false,
    },
    sendMessage: {
      type: Boolean,
      default: false,
    },
    interested: {
      type: Boolean,
      default: false,
    },
    resultFirstTalk: {
      type: String,
    },
    planningDescription: [
      {
        type: String,
      },
    ],
    runningDescription: [
      {
        type: String,
      },
    ],
    holdDescription: [
      {
        type: String,
      },
    ],
    completedDescription: [
      {
        type: String,
      },
    ],
    resources: [
      {
        assignedTo: [

        ],
        numberOfResources: {
          type: Number,
        },
        startDate: {
          type: Date,
        },
        expectedEndDate: {
          type: Date,
        },
        remarks: {
          type: String,
        },
      },
    ],
    agreements: {
      msa: {
        checked: {
          type: Boolean,
          default: false,
        },
        dateTime: {
          type: Date,
        },
      },
      dsa: {
        checked: {
          type: Boolean,
          default: false,
        },
        dateTime: {
          type: Date,
        },
      },
      nonSolicitation: {
        checked: {
          type: Boolean,
          default: false,
        },
        dateTime: {
          type: Date,
        },
      },
    },
  },
  { timestamps: true }
);

const ProjectDetails = mongoose.model("ProjectDetails", projectSchema);

module.exports = ProjectDetails;
