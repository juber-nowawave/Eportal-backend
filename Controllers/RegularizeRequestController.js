const { requestRegulariseModel } = require("../Models/RegularizeRequest");
const biometricAttendenceModel = require("../Models/biometricAttendence");

const responseHandler = require("../library/responseTemplate");

const getRegulariseRequests = async (req, res) => {
  try {
    const { startDate, endDate, requestType, requestStatus } = req.query;

    if (Object.keys(req.query).length == 0) {
      const result = await requestRegulariseModel.find({});
      res.json(
        responseHandler(
          1,
          200,
          "succesfully get Regularise request Data Stored",
          result
        )
      );
    } else if (requestStatus == "all") {
      const result = await requestRegulariseModel.find({});
      res.json(
        responseHandler(
          1,
          200,
          "succesfully get Regularise request Data Stored",
          result
        )
      );
    } else {
      let result = [];
      if (requestType != "all") {
        result = await requestRegulariseModel.find({
          $and: [
            { applyDate: { $gte: startDate } },
            { applyDate: { $lte: endDate } },
            { requestType: requestType },
            { requestStatus: { $eq: requestStatus } },
          ],
        });
      } else {
        result = await requestRegulariseModel.find({
          $and: [
            { applyDate: { $gte: startDate } },
            { applyDate: { $lte: endDate } },
            { requestStatus: { $eq: requestStatus } },
          ],
        });
      }

      res.json(
        responseHandler(
          1,
          200,
          "succesfully get Employee Regularise Data Stored",
          result
        )
      );
    }
  } catch (error) {
    console.log("Error During get Regularise request Data");
    res.json(
      responseHandler(1, 400, "Error During get Regularise request Data", error)
    );
  }
};

const postRegulariseRequests = async (req, res) => {
  try {
    const result = new requestRegulariseModel(req.body);
    result.save();

    res.json(
      responseHandler(
        1,
        200,
        "succesfully post Regularise request Data Stored",
        result
      )
    );
  } catch (error) {
    console.log("Error During post Regularise request Data");
    res.json(
      responseHandler(
        1,
        400,
        "Error During post Regularise request Data",
        error
      )
    );
  }
};



const putRegulariseRequests = async (req, res) => {
  try {
    const { requestData, approvalType } = req.body;

    if (
      !requestData ||
      !Array.isArray(requestData) ||
      requestData.length === 0
    ) {
      return res.json(
        responseHandler(0, 400, "Regularise Request Invalid request IDs", null)
      );
    }

    if (!approvalType) {
      return res.json(
        responseHandler(0, 400, "Regularise Request Approval type is required", null)
      );
    }

    // Update request status
    await Promise.all(
      requestData.map(async (obj) => {
        if(obj.rowId != undefined){ // this condition used when admin update data by self without any request of changes
          const result = await requestRegulariseModel.updateMany(
            { _id: obj.rowId },
            { $set: { requestStatus: approvalType } }
          );
          console.log(`Updated request status for ${obj.rowId}`, result);
        }
      })
    );

    // Update biometric session time
    if (approvalType !== "reject") {
      for (const obj of requestData) {
        const { rowId, newSessionInfo } = obj;
        const {
          date,
          esslId,
          type,
          checkInTime,
          checkOutTime,
          checkInId,
          checkOutId,
        } = newSessionInfo;

        if (type === "both") {
          // Update for both check-in and check-out
          const result1 = await biometricAttendenceModel.updateOne(
            {
              "records._id": checkInId,
            },
            {
              $set: { "records.$.time": checkInTime },
            }
          );
          console.log(`Updated check-in record`, result1);

          const result2 = await biometricAttendenceModel.updateOne(
            {
              "records._id": checkOutId,
            },
            {
              $set: { "records.$.time": checkOutTime },
            }
          );
        } else {
          // Update either check-in or check-out
          const newTime = type === "checkIn" ? checkInTime : checkOutTime;
          const entryId = type === "checkIn" ? checkInId : checkOutId;

          const result = await biometricAttendenceModel.updateOne(
            {
              "records._id": entryId,
            },
            {
              $set: { "records.$.time": newTime },
            }
          );
        }
      }

      res.json(
        responseHandler(
          1,
          200,
          "Regularise Request Updated Successfully",
          null
        )
      );
    } else {
      res.json(
        responseHandler(1, 200, "Your request has been rejected", null)
      );
    }
  } catch (error) {
    console.error("Error during update Regularise request data:", error);
    res.json(
      responseHandler(
        0,
        500,
        "Error during update Regularise request data",
        error.message
      )
    );
  }
};


module.exports = {
  getRegulariseRequests,
  postRegulariseRequests,
  putRegulariseRequests,
};






// const putRegulariseRequests = async (req, res) => {
//   try {
//     const { requestData, approvalType } = req.body;
//     if (
//       !requestData ||
//       !Array.isArray(requestData) ||
//       requestData.length === 0
//     ) {
//       return res.json(
//         responseHandler(0, 400, "Regularise Request Invalid request IDs", null)
//       );
//     }

//     if (!approvalType) {
//       return res.json(
//         responseHandler(
//           0,
//           400,
//           "Regularise Request Approval type is required",
//           null
//         )
//       );
//     }

//     // update request status
//     requestData.forEach(async (obj) => {
//       const result = await requestRegulariseModel.updateMany(
//         { _id: obj.rowId },
//         { $set: { requestStatus: approvalType } }
//       );
//     });

//     // update biometric session time
//     if (approvalType != "reject") {
//       for (const obj of requestData) {
//         const { rowId, newSessionInfo } = obj;
//         const {
//           date,
//           esslId,
//           type,
//           checkInTime,
//           checkOutTime,
//           checkInId,
//           checkOutId,
//           _id,
//         } = newSessionInfo;
        
//         if (type == "both") {
//           const result1 = await biometricAttendenceModel.updateOne(
//             {
//               "records._id": checkInId,
//               "records.entryType": "checkIn",
//               "records.esslId": esslId,
//               "records.date": date,
//             },
//             {
//               $set: { "records.$.time": checkInTime },
//             }

//           );

//           console.log(`Updated record`, result1);

//           const result2 = await biometricAttendenceModel.updateOne(
//             {
//               "records._id": checkOutId,
//               "records.entryType": "checkOut",
//               "records.esslId": esslId,
//               "records.date": date,
//             },
//             {
//               $set: { "records.$.time": checkOutTime },
//             }
//           );

//           // if (result1.matchedCount === 0 || result2.matchedCount == 0) {
//           //   return res.json(
//           //     responseHandler(
//           //       0,
//           //       404,
//           //       "No matching requests found to update",
//           //       null
//           //     )
//           //   );
//           // }
//           console.log(`Updated record`, result2);
//         } else {
//           const newTime = type === "checkIn" ? checkInTime : checkOutTime;
//           const entryId = type === "checkIn" ? checkInId : checkOutId;
//           console.log('lo',type)

//           const result = await biometricAttendenceModel.updateOne(
//             {
//               $and:[
//                 {"records._id": entryId},
//                 // {"records.entryType": type},
//                 {"records.esslId": esslId},
//                 {"records.date": date},
//               ]
//             },
//             {
//               $set: { "records.$.time": newTime },
//             }
//           );
//           console.log(`Updated record`, result);
//           // if (result.matchedCount === 0) {
//           //   return res.json(
//           //     responseHandler(
//           //       0,
//           //       404,
//           //       "No matching requests found to update",
//           //       null
//           //     )
//           //   );
//           // } else {
//           //   return res.json(
//           //     responseHandler(
//           //       1,
//           //       200,
//           //       "Regularise Request Updated Successfully",
//           //       null
//           //     )
//           //   );
//           // }
//         }
//       }
//     } else {
//       res.json(
//         responseHandler(1, 200, "Your request has been rejected", result)
//       );
//     }
//   } catch (error) {
//     console.error("Error during update Regularise request data:", error);
//     res.json(
//       responseHandler(
//         0,
//         500,
//         "Error during update Regularise request data",
//         error.message
//       )
//     );
//   }
// };
