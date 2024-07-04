const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/userController')

router

.post('/signup', userCtrl.userSignup)


module.exports = router