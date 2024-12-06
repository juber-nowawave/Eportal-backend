const biometricAttendence = require('../Models/biometricAttendence');
const responseHandler = require("../library/responseTemplate");

const postBiometricAttendence = async (req,res) =>{
 try{
     let data = {
        "date" : req.body[0].date,
        "day" : req.body[0].day,
        "records":req.body,
     }
     
    // create index value in DB 
    //  const index = await biometricAttendence.createIndexes([{key:{date:1},unique:true}]);

     const document = new biometricAttendence(data);
     document.save();
     console.log('success:',document);
     res.json(responseHandler(1, 200, "Biometric Data succesfully Stored", data));
}catch(error){
     console.log('Error During post Biometric attendence Data');
     res.json(responseHandler(1,400, "Error During post Biometric attendence Data", error)); 
}   
}

const getBiometricAttendence = async (req,res) =>{
    try{
        const result = await biometricAttendence.find({});
        console.log('result');
        res.json(responseHandler(1, 200, "Biometric Atttendence Data succesfully fetched", result));
   }catch(error){
        res.json(responseHandler(0,400, "Error During fetched Biometric attendence Data", error)); 
   }   
}

module.exports = {postBiometricAttendence , getBiometricAttendence};
