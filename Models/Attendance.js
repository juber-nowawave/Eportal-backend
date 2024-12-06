const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'EmployeeProfile',
  },
  sessions: [
    {
      checkIn: { type: Date, required: true },
      checkOut: { type: Date }, // Optional initially; updated at checkout
    },
  ],
  totalDuration: {
    type: Number, // Duration in milliseconds
    default: 0,
  },
  history: [
    {
      sessions: { type: Array },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
}, {
  timestamps: true,
});

// Pre-save hook to calculate totalDuration based on sessions
AttendanceSchema.pre('save', function(next) {
  this.totalDuration = this.sessions.reduce((acc, session) => {
    if (session.checkOut) {
      return acc + (session.checkOut - session.checkIn);
    }
    return acc;
  }, 0);
  next();
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
