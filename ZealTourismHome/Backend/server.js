require('dotenv').config()
const express = require('express')
const app = express ()
const path = require('path');
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const session = require('express-session');
const passport = require('passport')
const port = process.env.BACKEND_PORT || 5000
require('./Database/connection')
require('../Backend/public/js/googleAuth')
require('../Backend/public/js/FacebookAuth')
const userRouter = require('../Backend/routes/userRoute');

      

  

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))


const loginlimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // Limit each IP to 5 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
})

 // Application level middlewares
app.use(passport.session());
app.use(passport.initialize());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieparser())
app.use(bodyParser.json());  
// app.use(loginlimiter)
app.use(cors())

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the "public" directory
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// Serve reset password HTML page
app.get('/resetpassword/:userId/:token', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resetpassword.html'));
});

app.get('/loginsuccespage',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
})
       
// initial google authtication
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
app.get( '/auth/google/callback',   
    passport.authenticate( 'google', {
        successRedirect: '/Home',
        failureRedirect: '/failure'
}));

// login withGoogle success API
app.get('/login/google/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User Login", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
  });    
  

  //initial Facebook authetication
  app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}))
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook',{
      successRedirect: '/Home',
      failureRedirect: '/failure'
  }))


  // login withfacebook success API
app.get('/login/facebook/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User Login", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
  });    
  
     
   

   
    
app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.get('/failure',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'Error.html'));
})

app.get('/logout', (req, res) => {
    req.logout(); // This clears the authenticated session

    // Redirect to a login page or home page after logout
    res.redirect('/Home'); // Adjust this URL based on your application's routes
});
;


// Router Level Midlware
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send('hello backend')
})




app.listen(port,()=>{
    console.log('server start at port on 5000');
})



