require('dotenv').config()
const express = require('express')
const app = express ()
const path = require('path');
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const port = process.env.BACKEND_PORT
require('./Database/connection')



// Serve static files from the "public" directory
app.use('/assets', express.static(path.join(__dirname, 'Zeal Tourism_Home', 'assets')));


// const loginlimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 10, // Limit each IP to 5 login requests per windowMs
//     message: "Too many login attempts from this IP, please try again after 15 minutes"
// })

    
// example



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Zeal Tourism_Home', 'index.html'));
});


 // Application level middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieparser())
// app.use(loginlimiter)



app.get('/',(req,res)=>{
    res.send('hello backend')
})




app.listen(port,()=>{
    console.log('server start at port on 5000');
})



