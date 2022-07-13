const mongoose = require('mongoose');

const url =process.env.MONGO_PROD_URI;

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})
.then(()=>{
    console.log("database is conneted Sucesfffuly")
})
.catch(err=>{
    console.log(err.message)
})


module.exports =mongoose