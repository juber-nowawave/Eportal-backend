const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
    requestStatus:{
        type:String,
        default:'pending'
    },
    requestType:{
        type:String,
        default:'leaveApply'
    },
    userName:{
        type:String,
        default:'user'
    },
    esslId:{
        type:String,
        default:0
    },
    isNotificationActive:{
        type:Boolean,
        default:true
    },
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

const requestLeaveModel = mongoose.model('requestLeaves',leaveSchema);
module.exports = {requestLeaveModel};