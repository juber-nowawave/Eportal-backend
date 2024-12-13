const {requestLeaveModel} = require('../Models/LeaveApplyRequests');
const responseHandler = require("../library/responseTemplate");

const getAllLeaveRequests = async (req,res) => {
     try {
          // console.log(req.query);
          const {startDate, endDate, requestType, requestStatus} = req.query;
          
          if(Object.keys(req.query).length == 0){
               const result = await requestLeaveModel.find({});
               res.json(responseHandler(1, 200, "succesfully get AttendenceType request Data Stored", result));
          }
          else if(requestStatus == 'all'){
               
               const result = await requestLeaveModel.find({});
               res.json(responseHandler(1, 200, "succesfully get AttendenceType request Data Stored", result));
          }else{
               let result = [];
               if(requestType != 'all'){
                    result = await requestLeaveModel.find({
                         $and: [
                              { applyDate: { $gte: startDate } },
                              { applyDate: { $lte: endDate } },
                              { requestType:requestType},
                              { requestStatus: { $eq: requestStatus} },
                            ]
                    });
               }else{
                    result = await requestLeaveModel.find({
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

const postLeaveRequests = async (req,res) => {
    try {
        const result = new requestLeaveModel(req.body);
        result.save();

        res.json(responseHandler(1, 200, "succesfully post AttendenceType request Data Stored", 'lkl'));
   } catch (error) {
        console.log('Error During post AttendenceType request Data');
        res.json(responseHandler(1, 400, "Error During post AttendenceType request Data", error));
   }
}



const putLeaveRequests = async (req, res) => {
     
     try {
         const { requestIds, approvalType } = req.body;
         if (!requestIds || !Array.isArray(requestIds) || requestIds.length === 0) {
             return res.json(responseHandler(0, 400, "Leave Request Invalid request IDs", null));
         }
 
         if (!approvalType) {
             return res.json(responseHandler(0, 400, "Leave Request Approval type is required", null));
         }

         const result = await requestLeaveModel.updateMany(
             { _id: { $in: requestIds } },
             { $set: { requestStatus: approvalType } }        
         );
         console.log('mnnn',result);
        
         if(approvalType != 'rejected'){
              if (result.matchedCount === 0) {
                  return res.json(responseHandler(0, 404, "No matching requests found to update", null));
              }else{
                   res.json(
                    responseHandler(1,200,"Your request has been approved",result)
                   );
              }

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
 

module.exports = {getAllLeaveRequests , postLeaveRequests, putLeaveRequests };