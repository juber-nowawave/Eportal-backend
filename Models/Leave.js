const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
    applyDate:{
      type:String,
      defualt: Date.now,
    },
    forPeriod:{
        type:String,
        defualt: Date.now,
    },
    fromDate:{
        type:String,
        defualt: Date.now,
    },
    toDate:{
        type:Date,
        defualt: Date.now,
    },
    startDay:{
      type:String,
    },
    lastDay:{
      type:String,
    },
    totalDays:{
      type:String,
    },
    attachDocument:{
        type:mongoose.Schema.Types.Mixed,
    },
    reason:{
      type:String,
    //   required:true,  
    }
});

const LeaveModel = mongoose.model('leaves',leaveSchema);
module.exports = LeaveModel;