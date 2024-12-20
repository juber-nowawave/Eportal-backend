const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
        date:{
            type:String,
        },
        esslId:{
            type:String,
        },
        checkInId:{
            type:String,
        },
        checkOutId:{
            type:String,
        },
        checkInTime:{
            type:String,
        },
        checkOutTime:{
            type:String,
        },
        type:{
            type:String,
        },
        reason:{
            type:String,
            default:'Not Mentioned'
        },
});

const schema = new mongoose.Schema({
    requestStatus:{
        type:String,
        default:'pending',
    },
    requestType:{
        type:String,
        default:'regularise',
    },
    userName:{
        type:String,
    },
    isNotificationActive:{
        type:Boolean,
        default:true
    },
    applyDate:{
        type:String,
    },
    reason:{
        type:String,
        default:'Not mentioned'
    },
    oldSessionInfo:sessionSchema,
    newSessionInfo: sessionSchema,
})

const requestRegulariseModel = mongoose.model('RequestRegularise',schema);

module.exports = {requestRegulariseModel};