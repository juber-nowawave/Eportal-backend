const {
  requestEmployeeDetailsModel,
} = require("../Models/EmployeeDetailsRequest");
const EmployeeModel = require("../Models/Employee");

const responseHandler = require("../library/responseTemplate");

const getAllEmployeeDetailRequests = async (req, res) => {
  try {
    // console.log(req.query);
    const { startDate, endDate, requestType, requestStatus } = req.query;

    if (Object.keys(req.query).length == 0) {
      const result = await requestEmployeeDetailsModel.find({});
      res.json(
        responseHandler(
          1,
          200,
          "succesfully get Employee Details request Data Stored",
          result
        )
      );
    } else if (requestStatus == "all") {
      const result = await requestEmployeeDetailsModel.find({});
      res.json(
        responseHandler(
          1,
          200,
          "succesfully get Employee Details request Data Stored",
          result
        )
      );
    } else {
      let result = [];
      if (requestType != "all") {
        result = await requestEmployeeDetailsModel.find({
          $and: [
            { applyDate: { $gte: startDate } },
            { applyDate: { $lte: endDate } },
            { requestType: requestType },
            { 'information.requestStatus': { $eq: requestStatus } },
          ],
        });
      } else {
        result = await requestEmployeeDetailsModel.find({
          $and: [
            { applyDate: { $gte: startDate } },
            { applyDate: { $lte: endDate } },
            { 'information.requestStatus': { $eq: requestStatus } },
          ],
        });
      }

      res.json(
        responseHandler(
          1,
          200,
          "succesfully get Employee Details request Data Stored",
          result
        )
      );
    }
  } catch (error) {
    console.log("Error During get Employee Details request Data");
    res.json(
      responseHandler(
        1,
        400,
        "Error During get Employee Details request Data",
        error
      )
    );
  }
};

const postEmployeeDetailRequests = async (req, res) => {
  try {
    const result = new requestEmployeeDetailsModel(req.body);
    result.save();

    res.json(
      responseHandler(
        1,
        200,
        "succesfully post Employee Details request Data Stored",
        result
      )
    );
  } catch (error) {
    console.log("Error During post Employee Details request Data");
    res.json(
      responseHandler(
        1,
        400,
        "Error During post Employee Details request Data",
        error
      )
    );
  }
};


const putEmployeeDetailRequests = async (req, res) => {
  try {
    const { requestData, approvalType } = req.body;

    // Validation
    if (!requestData || !Array.isArray(requestData) || requestData.length === 0) {
      return res.json(
        responseHandler(
          0,
          400,
          "Employee Details Request Invalid request IDs",
          null
        )
      );
    }

    if (!approvalType) {
      return res.json(
        responseHandler(
          0,
          400,
          "Employee Details Request Approval type is required",
          null
        )
      );
    }

    requestData.forEach( async (obj)=>{
      const result = await requestEmployeeDetailsModel.updateMany(
           { 'information._id': obj.rowId },
           { $set: { 'information.$.requestStatus': approvalType } }
      );
    })

    if (approvalType !== "rejected") {
      // Loop through each requestData item and perform updates
      const bulkUpdateOperations = requestData.map((obj) => {
        // Prepare dynamic update fields from `information`
        const updateFields = {};
        

        // NOTE =>>>> qualification information is not updating 
        if (obj.informationType === 'qualificationInfo' && obj.information) {
          for (const [key, value] of Object.entries(obj.information)) {
            if (key === "year") {
              // Ensure the year is a valid number
              const numericYear = parseInt(value, 10);
              if (isNaN(numericYear)) {
                console.error(`Invalid year value: ${value}`);
                return;
              }
              updateFields[`educationHistory.$[element].${key}`] = numericYear;
            } else {
              // Add other fields as is
              updateFields[`educationHistory.$[element].${key}`] = value;
            }
          }
      
          return {
            updateOne: {
              filter: { _id: obj.userId, esslId: obj.esslId },
              update: { $set: updateFields },
            },
          };
        }
         else if (obj.information) {
          for (const [key, value] of Object.entries(obj.information)) {
            updateFields[key] = value;
          }
        }

        return {
          updateOne: {
            filter: { _id: obj.userId, esslId: obj.esslId },
            update: { $set: updateFields },
          },
        };
      });

      // Perform bulk update in the EmployeeModel
      const result = await EmployeeModel.bulkWrite(bulkUpdateOperations);

      if (result.matchedCount === 0) {
        return res.json(
          responseHandler(
            0,
            404,
            "In Employee Details No matching requests found to update",
            null
          )
        );
      }

      return res.json(
        responseHandler(
          1,
          200,
          "Your Employee Details request has been approved",
          result
        )
      );
    } else {
      // For rejected status, update only the requestStatus in requestEmployeeDetailsModel
      const rejectionUpdates = requestData.map((obj) => ({
        updateOne: {
          filter: { "information._id": obj.rowId },
          update: { $set: { "information.$.requestStatus": "rejected" } },
        },
      }));

      const result = await requestEmployeeDetailsModel.bulkWrite(
        rejectionUpdates
      );

      return res.json(
        responseHandler(
          1,
          200,
          "Your Employee Details request has been rejected",
          result
        )
      );
    }
  } catch (error) {
    console.error("Error during update Employee Details request data:", error);
    res.json(
      responseHandler(
        0,
        500,
        "Error during update Employee Details request data",
        error.message
      )
    );
  }
};


// const putEmployeeDetailRequests = async (req, res) => {
//   try {
//     const { requestData, approvalType } = req.body;
//     console.log("detailssss", req.body);
    
//     if (!requestData || !Array.isArray(requestData) || requestData.length === 0) {
//       return res.json(
//         responseHandler(
//           0,
//           400,
//           "Employee Details Request Invalid request IDs",
//           null
//         )
//       );
//     }

//     if (!approvalType) {
//       return res.json(
//         responseHandler(
//           0,
//           400,
//           "Employee Details Request Approval type is required",
//           null
//         )
//       );
//     }

    //  requestData.forEach( async (obj)=>{
    //       const result = await requestEmployeeDetailsModel.updateMany(
    //            { 'information._id': obj.rowId },
    //            { $set: { 'information.$.requestStatus': approvalType } }
    //       );
    //  })



//     if (approvalType != "rejected") {
//       requestData.forEach(async (obj)=>{
//         const updateResult = await EmployeeModel.updateMany({
//            $and:[
//             {_id:obj.userId},
//             {esslId:obj.esslId}
//            ]
//         },{
          
//         })
              
//       })
//       if (result.matchedCount === 0) {
//         return res.json(
//           responseHandler(
//             0,
//             404,
//             "In Employee Details No matching requests found to update",
//             null
//           )
//         );
//       } else {
//         res.json(
//           responseHandler(
//             1,
//             200,
//             "Your Employee Details request has been approved",
//             result
//           )
//         );
//       }
//     } else {
//       res.json(
//         responseHandler(
//           1,
//           200,
//           "Your Employee Details request has been rejected",
//           result
//         )
//       );
//     }
//   } catch (error) {
//     console.error("Error during update Employee Details request data:", error);
//     res.json(
//       responseHandler(
//         0,
//         500,
//         "Error during update Employee Details request data",
//         error.message
//       )
//     );
//   }
// };




module.exports = {
  getAllEmployeeDetailRequests,
  postEmployeeDetailRequests,
  putEmployeeDetailRequests,
};
