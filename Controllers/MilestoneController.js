const milestoneModel = require('../Models/Milestone');
const responseHandler = require("../library/responseTemplate");

const postMilestone = async (req,res) => {
  try{
   const result = new milestoneModel(req.body);
   result.save();
   res.json(responseHandler(1, 200, "Milestone Data succesfully added", result));
  }catch(err){
   return res.json(responseHandler(0, 400, "Error from Milestone ", err.message))
  }  
}

const getMilestone = async (req,res) => {
    try{
    const data = await milestoneModel.find({});
    res.json(responseHandler(1, 200, "Milestone Data succesfully fetched", data));
    }catch(err){
     return res.json(responseHandler(0, 400, "Error from Milestone ", err.message))
    }  
}

module.exports = {postMilestone,getMilestone};

