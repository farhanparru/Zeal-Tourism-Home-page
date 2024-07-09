const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiry: { type: Date },
});

const OTP = mongoose.model('otpnumber',optSchema)
module.exports = OTP
