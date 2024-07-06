const mongoose = require('mongoose')

const facebookSchema  = new mongoose.Schema({
    facebookId:String,
    displayName:String,
    token:String,
    email:String,
    image:String
})

module.exports = mongoose.model('facebook',facebookSchema)