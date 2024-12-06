const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  isFirstLogin:{
    type:Boolean,
    default:true,
  },
  user_role: {
    type: String,
    required: true,
    enum: ['manager', 'admin', 'employee'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
