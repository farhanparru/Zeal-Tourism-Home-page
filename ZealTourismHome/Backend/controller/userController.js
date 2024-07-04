const userModel = require('../Model/userModel')
const JoiValidation = require('../Model/JoiValidation')
const jwt = require('jsonwebtoken')

module.exports = {
 
    userSignup: async (req,res)=>{
        try {
           const {FirstName,PhoneNumber, password} = req.body
           const {error, value} = JoiValidation.validate(req.body)  
        } catch (error) {
            
        }
    }



}