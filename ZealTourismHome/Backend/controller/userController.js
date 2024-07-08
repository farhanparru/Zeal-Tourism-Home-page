const userModel = require("../Model/userModel");
const JoiValidation = require("../Model/JoiValidation");
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  userSignup: async (req, res) => {
    try {
      const { FirstName, email, PhoneNumber, password } = req.body;
      const { error, value } = JoiValidation.validate(req.body);

      if (error) {
        console.log(error);
        return res.status(400).json({
          status: "Error",
          message: "Invalid user input ☹️. Please check your data. 🙂",
        });
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const findUser = await userModel.findOne({ PhoneNumber });
      if (findUser) {
        return res.status(400).json({
          succes: false,
          message: "User with this phoneNumber alreday exist",
        });
      }

      const newUser = new userModel({
        FirstName: FirstName,
        email: email,
        PhoneNumber: PhoneNumber,
        password: password,
      });

      // console.log(newUser);

      await newUser.save();

      return res.status(200).json({
        status: "success",
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  },

  //  user ResetPassword link using a nodemailer

  Resetpasswordlink: async (req, res) => {
    const { email } = req.body;
    try {
      const userfind = await userModel.findOne({ email });
      if (!userfind) {
        return res.status(400).json("User with this email does not exist");
      }

      // Generate reset time-limited token

      const token = crypto.randomBytes(20).toString("hex");

      // Set token and expiration time
      userfind.resetPasswordToken = token;
      userfind.resetPasswordExpires = Date.now() + 2 * 60 * 1000; // 2 minutes
      await userfind.save();

      // Update user with the token

      const setUserToken = await userModel.findByIdAndUpdate(
        { _id: userfind._id },
        { resetPasswordToken: token },
        { new: true }
      );

      if (!setUserToken) {
        return res.status(500).json({ message: "Failed to set user token" });
      }

      // Send reset email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });
      // Define mail options

      if (setUserToken) {
        const mailOptions = {
          from: process.env.FROM_EMAIL,
          subject: "Reset Password Link",
          to: email,
          text: `This Link is Valid For 2 MINUTES: http://localhost:5000/resetpassword/${userfind.id}/${userfind.resetPasswordToken}`,
        };

        // Send email

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.status(400).json({ error: "Email not sent" });
          } else {
            console.log("Email sent:", info.response);
            return res.status(200).json({ message: "Email sent successfully" });
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // ResetPassword Token expire check

  ResetTokenTime:async(req,res)=>{
    const {userId, token} = req.params

    try {
      const user = await userModel.findOne({
        _id:userId,
        resetPasswordToken:token,
        resetPasswordExpires: { $gt: Date.now() } // Check if the token is not expired
      })

      if(!user){
        return res.status(400).json({ message: 'Password reset token is invalid or has expired. Please request a new reset link.' });
      }
      res.sendFile(path.join(__dirname, 'public', 'resetpassword.html'));
    } catch (error) {
      res.status(500).send('Error on the server.');
      
    }
  },

  changePassword: async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmpassword } = req.body;
  
    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }
  
    try {
      const validUser = await userModel.findOne({ _id: id, resetPasswordToken: token });
  
      if (validUser) {
        const newPassword = await bcrypt.hash(password, 12);
        await userModel.findByIdAndUpdate(
          { _id: id },
          { password: newPassword }
        );
  
        res.status(201).json({
          status: 201,
          message: "Password changed successfully",
        });
      } else {
        res.status(401).json({ status: 401, message: "User does not exist or token is invalid" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, error });
    }
  }
  
};
