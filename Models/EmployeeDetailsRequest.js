const mongoose = require("mongoose");

// const informationSchema = new mongoose.Schema({  
//   newPersonalInfo: {
//     firstName: { type: String },
//     middleName: { type: String },
//     lastName: { type: String },
//     dateOfBirth: { type: String },
//     gender: { type: String },
//     email: { type: String },
//     mobileNumber: { type: String },
//     emergencyNumber: { type: String },
//     pincode: { type: String },
//     address: { type: String },
//   },
//   oldPersonalInfo: {
//     firstName: { type: String },
//     middleName: { type: String },
//     lastName: { type: String },
//     dateOfBirth: { type: String },
//     gender: { type: String },
//     email: { type: String },
//     mobileNumber: { type: String },
//     emergencyNumber: { type: String },
//     pincode: { type: String },
//     address: { type: String },
//   },
//   newQualificationInfo: {
//     highestQualification: { type: String },
//     year: { type: String },
//     marks: { type: String },
//   },
//   oldQualificationInfo: {
//     highestQualification: { type: String },
//     year: { type: String },
//     marks: { type: String },
//   },
//   newStatutoryInfo: {
//     bankAccountNumber: { type: String },
//     adharNumber: { type: String },
//     IFSCCode: { type: String },
//     panNumber: { type: String },
//   },
//   oldStatutoryInfo: {
//     bankAccountNumber: { type: String },
//     adharNumber: { type: String },
//     IFSCCode: { type: String },
//     panNumber: { type: String },
//   },
// });


// const informationSchema = new mongoose.Schema({  
//    personalInfo:[
//     {
//         firstName: { type: String },
//         middleName: { type: String },
//         lastName: { type: String },
//         dateOfBirth: { type: String },
//         gender: { type: String },
//         email: { type: String },
//         mobileNumber: { type: String },
//         emergencyNumber: { type: String },
//         pincode: { type: String },
//         address: { type: String },
//       },
//       {
//         firstName: { type: String },
//         middleName: { type: String },
//         lastName: { type: String },
//         dateOfBirth: { type: String },
//         gender: { type: String },
//         email: { type: String },
//         mobileNumber: { type: String },
//         emergencyNumber: { type: String },
//         pincode: { type: String },
//         address: { type: String },
//       },
//    ],
//    qualificationInfo:[
//        {
//          highestQualification: { type: String },
//          year: { type: String },
//          marks: { type: String },
//        },
//        {
//           highestQualification: { type: String },
//           year: { type: String },
//           marks: { type: String },
//         },
//    ],
   
//    statutoryInfo:[
//     {
//        bankAccountNumber: { type: String },
//        adharNumber: { type: String },
//        IFSCCode: { type: String },
//        panNumber: { type: String },
//     },
//     {
//       bankAccountNumber: { type: String },
//       adharNumber: { type: String },
//       IFSCCode: { type: String },
//       panNumber: { type: String },
//     },
// ]
//   });


const informationSchema = new mongoose.Schema({
  // The type of information being changed
  requestStatus: { type: String, default: "pending",},
  type: { type: String, required: true }, // e.g., "personalInfo", "qualificationInfo", "statutoryInfo"
  oldInfo: { type: mongoose.Schema.Types.Mixed, required: true }, // Old values stored as a flexible object
  newInfo: { type: mongoose.Schema.Types.Mixed, required: true }, // New values stored as a flexible object
});

const EmployeeDetailsSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "Not Provided",
    required: true,
  },
  userId: {
    type: String,
    default: "Not Provided",
    required: true,
  },
  esslId: {
    type: String,
    default: "Not Provided",
    required: true,
  },
  requestStatus: {
    type: String,
    default: "pending",
  },
  requestType: {
    type: String,
    default: "employeeDetails",
  },
  isNotificationActive: {
    type: Boolean,
    default: true,
  },
  applyDate: {
    type: String,
    defualt: Date.now,
  },
  information: [informationSchema],
});


const requestEmployeeDetailsModel = mongoose.model(
  "requestEmployeeDetails",
  EmployeeDetailsSchema
);
module.exports = { requestEmployeeDetailsModel };
