const mongoose = require('mongoose')

const DATABASE = process.env.DATABSE_CLOUD



mongoose.connect(DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>console.log('Databse connected')).catch((err)=>console.log("err",err))