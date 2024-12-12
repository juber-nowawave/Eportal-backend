const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    requestStatus:{
        type:String,
        default:'pending',
    },
    requestType:{
        type:String,
        default:'attendenceType',
    },
    userName:{
        type:String,
    },
    esslId:{
        type:String,
    },
    isNotificationActive:{
        type:Boolean,
        default:true
    },
    attendenceDate:{
        type:String,
    },
    attendenceType:{
        type:String,
        default:'present'
    },
    attendenceTypeFeildId:{
        type:String,
    },
    reason:{
        type:String,
        default:'Not mentioned'
    },
    applyDate:{
        type:String,
    }

})

const attendenceTypeRequestsModel = mongoose.model('RequestsattendenceType',schema);

module.exports = {attendenceTypeRequestsModel};