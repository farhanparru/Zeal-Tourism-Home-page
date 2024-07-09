const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/userController')

router

.post('/signup', userCtrl.userSignup)
.post('/forgotpassword',userCtrl.Resetpasswordlink)
.get('/resetpassword/:userId/:token',userCtrl.ResetTokenTime)
.post('/changepassword/:id/:token', userCtrl.changePassword)
.post('/login', userCtrl.userLogin)
.post('/loginotp', userCtrl.loginOtp)
.post('/verifyOpt', userCtrl.Otpverify)

module.exports = router