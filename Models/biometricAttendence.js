const mongoose = require('mongoose');

const DateEntrySchema = new mongoose.Schema({
  esslId: {
    type: String,
    required: true,
    default:"not available",
  },
  date: {
    type: String,
    required: true,
    default:"not available",
  },
  day: {
    type: String,
    default:"not available",
  },
  time: {
    type: String,
    required: true,
    default:"not available",
  },
  workingHour:{
    type: String,
    default:"not available",
  }
});

const MainSchema = new mongoose.Schema({
  date:{
    type:String,
    required:true,
    unqiue:true,
  },
  day:{
    type:String,
  },
  records:{
    type:[DateEntrySchema],
    required:true,
  },
});


const biometricAttendence = mongoose.model('biometricAttendence', MainSchema);

module.exports = biometricAttendence;
