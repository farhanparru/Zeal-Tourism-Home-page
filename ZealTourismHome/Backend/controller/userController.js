const userModel = require("../Model/userModel");
const JoiValidation = require("../Model/JoiValidation");
const jwt = require("jsonwebtoken");

module.exports = {
  userSignup: async (req, res) => {
    try {
      const { FirstName, PhoneNumber, password } = req.body;
      const { error, value } = JoiValidation.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: "Error",
          message: "Invalid user input ☹️. Please check your data. 🙂",
        });
      }
         
      const findUser = await userModel.findOne({
        $or: [{ email: email }, { PhoneNumber: PhoneNumber }],
      });
  
      if (findUser) {
        if (findUser.email === email) {
          return res
            .status(400)
            .json({ message: "User with this email already exists." });
        }
  
        if (findUser.PhoneNumber === PhoneNumber) {
          return res
            .status(400)
            .json({ message: "Phone number already registered." });
        }
      }
      const newUser = new userModel({
        FirstName: FirstName,
        PhoneNumber:PhoneNumber,
        password:password
      })

      await newUser.save()

      return res.status(200).json({
        status:'success',
        message:"User registered successfully"
      })
       
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message:"Internal Server Error"
        })
    }
  },
};
