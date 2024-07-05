require('dotenv').config()
const express = require('express')
const app = express ()
const path = require('path');
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const passport = require('passport')
const port = process.env.BACKEND_PORT || 5000
require('./Database/connection')
require('../Backend/public/js/googleAuth')
const userRouter = require('../Backend/routes/userRoute'); 
const session = require('express-session');
      

  
// Serve static files from the "public" directory
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));


// initial google authtication
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/Home',
        failureRedirect: '/auth/google/failure'
}));



// setup session

app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))




const loginlimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // Limit each IP to 5 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
})

    
app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth/google/failure',(req,res)=>{
    res.send('Somthin worng')
})



app.use(cors())

 // Application level middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieparser())
app.use(loginlimiter)
app.use(passport.initialize());


// Router Level Midlware
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('hello backend')
})




app.listen(port,()=>{
    console.log('server start at port on 5000');
})



