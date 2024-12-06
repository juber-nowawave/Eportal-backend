const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  name: { type: String, required: true },
});

const Holiday = mongoose.model('Holiday', HolidaySchema);
module.exports = Holiday;
