const {attendenceTypeRequestsModel} = require('../Models/AttendenceTypeRequests');
const biometricAttendenceModel = require('../Models/biometricAttendence')
const {ObjectId} = require('mongodb');

const responseHandler = require("../library/responseTemplate");

const getAllRequests = async (req,res) => {
     try {
          // console.log(req.query);
          const {startDate, endDate, requestType, requestStatus} = req.query;
          if(requestStatus == 'all'){
               const result = await attendenceTypeRequestsModel.find({});
               res.json(responseHandler(1, 200, "succesfully get AttendenceType request Data Stored", result));
          }else{
               let result = [];
               if(requestType != 'all'){
                    result = await attendenceTypeRequestsModel.find({
                         $and: [
                              { applyDate: { $gte: startDate } },
                              { applyDate: { $lte: endDate } },
                              { requestType:requestType},
                              { requestStatus: { $eq: requestStatus} },
                            ]
                    });
               }else{
                    result = await attendenceTypeRequestsModel.find({
                         $and: [
                              { applyDate: { $gte: startDate } },
                              { applyDate: { $lte: endDate } },
                              { requestStatus: { $eq: requestStatus} },
                            ]
                    });
               }
               res.json(responseHandler(1, 200, "succesfully get AttendenceType request Data Stored", result));
          }
     } catch (error) {
          console.log('Error During get AttendenceType request Data');
          res.json(responseHandler(1, 400, "Error During get AttendenceType request Data", error));
     }
}

const postRequests = async (req,res) => {
    try {
        
        const {esslId,userName,date,attendenceType,attendenceTypeFeildId} = req.body
        const result = new attendenceTypeRequestsModel(req.body);
        result.save();

        res.json(responseHandler(1, 200, "succesfully post AttendenceType request Data Stored", result));
   } catch (error) {
        console.log('Error During post AttendenceType request Data');
        res.json(responseHandler(1, 400, "Error During post AttendenceType request Data", error));
   }
}


const putRequests = async (req, res) => {
     
     try {
         const { requestIds, approvalType } = req.body;
         if (!requestIds || !Array.isArray(requestIds) || requestIds.length === 0) {
             return res.json(responseHandler(0, 400, "Attendence Type RequestInvalid request IDs", null));
         }
 
         if (!approvalType) {
             return res.json(responseHandler(0, 400, "Attendence Type Approval type is required", null));
         }
 
         const result = await attendenceTypeRequestsModel.updateMany(
             { _id: { $in: requestIds } },
             { $set: { requestStatus: approvalType } }        
         );

         let findResult = await attendenceTypeRequestsModel.find({_id:{$in:requestIds}})

         if(approvalType != 'reject'){
     
              for (const request of findResult) {
               const {attendenceDate , esslId , attendenceTypeFeildId, attendenceType , requestStatus} = request;
               const fieldId = new ObjectId(attendenceTypeFeildId);
     
               if (attendenceTypeFeildId && attendenceType) {
                   const updateResult = await biometricAttendenceModel.updateOne(
                    {
                        date: attendenceDate, 
                        "records.esslId": esslId
                    },
                    [
                        {
                            $set: {
                                records: {
                                    $map: {
                                        input: "$records",
                                        as: "record",
                                        in: {
                                            $cond: [
                                                { $eq: ["$$record.esslId", esslId] },
                                                {
                                                    $mergeObjects: ["$$record", { attendenceType: attendenceType}]
                                                },
                                                "$$record"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ]
                );
                
               console.log('resultssssss',updateResult);
                   if (updateResult.matchedCount === 0) {
                       console.log(`No matching records found to update in biometricAttendence for ID: ${attendenceTypeFeildId}`);
                   }
               }
              }
      
              if (result.matchedCount === 0) {
                  return res.json(responseHandler(0, 404, "No matching requests found to update", null));
              }
            //   findResult = await attendenceTypeRequestsModel.find({})
              res.json(
                  responseHandler(1,200,"Successfully updated AttendenceType request data",result)
              );
         }else{
              res.json(
               responseHandler(1,200,"Your request has been rejected",result)
              );

         }


     } catch (error) {
         console.error('Error during update AttendenceType request data:', error);
         res.json(
             responseHandler(0, 500, "Error during update AttendenceType request data", error.message)
         );
     }
 };
 

 const updateByAdmin = async (req, res) => {
     
    try {
        const { data } = req.body;
        let updateResult = null;
        const {attendenceDate , esslId , attendanceTypeFieldId, attendenceType} = data;
              if (attendanceTypeFieldId && attendenceType) {
                   updateResult = await biometricAttendenceModel.updateOne(
                   {
                       date: attendenceDate, 
                       "records.esslId": esslId
                   },
                   [
                       {
                           $set: {
                               records: {
                                   $map: {
                                       input: "$records",
                                       as: "record",
                                       in: {
                                           $cond: [
                                               { $eq: ["$$record.esslId", esslId] },
                                               {
                                                   $mergeObjects: ["$$record", { attendenceType: attendenceType}]
                                               },
                                               "$$record"
                                           ]
                                       }
                                   }
                               }
                           }
                       }
                   ]
               );
               
               if (updateResult.matchedCount === 0) {
                 responseHandler(1,400,'No matching records found to update in biometricAttendence for ID',updateResult)
               }
            }
            
             res.json(
                 responseHandler(1,200,"Successfully updated AttendenceType request data",updateResult)
             );

    } catch (error) {
        console.error('Error during update AttendenceType request data:', error);
        res.json(
            responseHandler(0, 500, "Error during update AttendenceType request data", error.message)
        );
    }
};




module.exports = {getAllRequests , postRequests, putRequests,updateByAdmin};