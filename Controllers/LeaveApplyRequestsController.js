const {requestLeaveModel} = require('../Models/LeaveApplyRequests');
const responseHandler = require("../library/responseTemplate");

const getAllLeaveRequests = async (req,res) => {
     try {
          // console.log(req.query);
          const {startDate, endDate, requestType, requestStatus} = req.query;
          if(requestStatus == 'all'){
               
               const result = await requestLeaveModel.find({});
               console.log('lkll',result);
               res.json(responseHandler(1, 200, "succesfully get AttendenceType request Data Stored", result));
          }else{
               console.log('svvvssssssssssssssssssssssssssssssssss',req.query);
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

         console.log('lklkk',req.body);
     //    const {applyDate,forPeriod,fromDate,toDate,attendenceTypeFeildId} = req.body
        const result = new requestLeaveModel(req.body);
        result.save();

        res.json(responseHandler(1, 200, "succesfully post AttendenceType request Data Stored", 'lkl'));
   } catch (error) {
        console.log('Error During post AttendenceType request Data');
        res.json(responseHandler(1, 400, "Error During post AttendenceType request Data", error));
   }
}

module.exports = {getAllLeaveRequests , postLeaveRequests};