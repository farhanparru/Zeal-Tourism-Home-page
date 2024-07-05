const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        FirstName:{
            type:String,
            required:true,
            unique: true,
        },
        PhoneNumber:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

// Hash user password before saving In Databse

userSchema.pre('save', async function (next) {
    // Check if the password has been modified to avoid re-hashing

    if(!this.isModified('password')){
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
    } catch (error) {
        next(error)
    }
})

const userDB = new mongoose.model('user', userSchema)
module.exports =  userDB    