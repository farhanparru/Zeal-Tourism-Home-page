const mongoose = require("mongoose")

const googleSchema =  new mongoose.Schema(
    {
        googleId:String,
        displayName:String,
        email:String,
        image:String,
        accessToken: String 
    },{timestamps:true})

const GoogleuserData = new mongoose.model('Google',googleSchema)
module.exports = GoogleuserData