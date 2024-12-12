const {attendenceTypeRequestsModel} = require('../Models/AttendenceTypeRequests');
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
               console.log('svvvssssssssssssssssssssssssssssssssss',result);
               res.json(responseHandler(1, 200, "succesfully get AttendenceType request Data Stored", result));
          }
     } catch (error) {
          console.log('Error During get AttendenceType request Data');
          res.json(responseHandler(1, 400, "Error During get AttendenceType request Data", error));
     }
}

const postRequests = async (req,res) => {
    console.log(req.body);
    try {
        
        const {esslId,userName,date,attendenceType,attendenceTypeFeildId} = req.body
        const result = new attendenceTypeRequestsModel(req.body);
        result.save();

        res.json(responseHandler(1, 200, "succesfully post AttendenceType request Data Stored", 'lkl'));
   } catch (error) {
        console.log('Error During post AttendenceType request Data');
        res.json(responseHandler(1, 400, "Error During post AttendenceType request Data", error));
   }
}

module.exports = {getAllRequests , postRequests};