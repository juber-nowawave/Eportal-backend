const leaveModel = require('../Models/Leave');
const responseHandler = require("../library/responseTemplate");

async function postLeave(req,res){
   try{
    res.setHeader("Content-Type", "application/json");
     const leaveData = new leaveModel(req.body);
     leaveData.save(); 
     res.json(responseHandler(1,200,"leave data saved successfullly"));
   }catch(err){
    return res.json(responseHandler(0, 400, "Error from apply for Leave ", error.message))
   }
}

async function getLeave(req,res){
    try{
     const data = await leaveModel.find({});
     console.log('data -> ',data);
     if(data){
        return res.json(responseHandler(1, 200, "fetch all leave data successfully",data));
     }else{
        return res.json(responseHandler(0, 400, "Error during fetch leave Data List",data));
     }
    }catch(err){
      return res.json(responseHandler(0, 400, "Error from Get Leave Data", err.message))
    } 
}
module.exports ={postLeave , getLeave};