const mongoose = require('mongoose');
const   milestoneSchema = new mongoose.Schema({
  milestoneName:{
    type:String,
    required:true,
  },
  assigned:{
    type:String,
    required:true,
  },
  startDate:{
    type:Date,
    required:true
  },
  dueDate:{
    type:Date,
    required:true,
  },
  actualStartDate:{
    type:Date,
    required:true,
  },
  assignedTo:{
    type:[String],
    required:true
  }
});


const milestoneModel = mongoose.model('milestone',milestoneSchema);

module.exports = milestoneModel