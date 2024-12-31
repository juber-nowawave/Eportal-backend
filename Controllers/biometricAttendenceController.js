const biometricAttendence = require('../Models/biometricAttendence');
const responseHandler = require("../library/responseTemplate");

// this below post function would be hit by biometric attendence server system by cron-job
const postBiometricAttendence = async (req, res) => {
     try {
          let data = {
               "date": req.body[0].date,
               "day": req.body[0].day,
               "records": req.body,
          }

          // create index value in DB 
          //  const index = await biometricAttendence.createIndexes([{key:{date:1},unique:true}]);

          const document = new biometricAttendence(data);
          document.save();
          res.json(responseHandler(1, 200, "Biometric Data succesfully Stored", data));
     } catch (error) {
          console.log('Error During post Biometric attendence Data');
          res.json(responseHandler(1, 400, "Error During post Biometric attendence Data", error));
     }
}

const getBiometricAttendence = async (req, res) => {
     try {
          const result = await biometricAttendence.find({});
          res.json(responseHandler(1, 200, "Biometric Atttendence Data succesfully fetched", result));
     } catch (error){
          res.json(responseHandler(0, 400, "Error During fetched Biometric attendence Data", error));
     }
}


// biometric attendence Data 
const getTotalDurationWeek = async (req,res) =>{
     try{
       const {userESSLid , startDate , endDate} = req.query;
       // const result = await biometricAttendence.find({$and:[
       //   {date:{$gte:startDate}},
       //   {date:{$lte:endDate}},
       //   {records:{$elemMatch:{esslId:userESSLid}}}
       // ]});
 
       const result = await biometricAttendence.aggregate([
         {
           $match: {
             $and: [
               { date: { $gte: startDate } },
               { date: { $lte: endDate } },
               { "records.esslId": userESSLid }
             ]
           }
         },
         {
           $project: {
             date: 1, 
             day:1,
             records: {
               $filter: {
                 input: "$records",
                 as: "record",
                 cond: { $eq: ["$$record.esslId", userESSLid] }
               }
             }
           }
         }
       ]);
      //  console.log(result); 
       res.status(200).json({ message: "Retrieving total duration successfull",result});
        
     }catch(err){
     console.error("Error retrieving total duration:", err);
     res.status(500).json({ message: "Error retrieving total duration", err });
     }
 }
 
 const editAttendenceType = async (req , res) => {
     try{ 
          const {userESSLid , date, attendenceType ,  attendenceTypeFeildId} = req.body;
          const result = await biometricAttendence.findOne({date:date});
       res.json(200)
     }catch(err){
       res.status(500).json({ message: "Error retrieving total duration", err });
     }
 }

module.exports = { postBiometricAttendence, getBiometricAttendence, getTotalDurationWeek , editAttendenceType};
