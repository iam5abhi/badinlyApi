const dotenv = require("dotenv").config()
require("dotenv").config()

 const environment = process.env.NODE_ENV;
 
//ejs
const ejs = require('ejs');

const https = require('http');

const socket = require('socket.io');

const express = require('express');
const db =require('./db/db')

const path = require('path'); 

const cors = require('cors');

const bodyParser = require('body-parser');

// const mongoose = require('mongoose')

const HttpError = require('./middleware/http-error')

const homepageRoutes = require('./routes/home-routes')

const userPageRoutes = require('./routes/user-routes');

const adminPageRoutes = require('./routes/admin-routes');

const productPageRoutes = require('./routes/product-routes');

const planPageRoutes = require('./routes/plans-routes');

const paymentPageRoutes = require('./routes/payment-routes');

const tradePageRoutes = require('./routes/trade-routes');

const app = express();

//allowing crross server from client side
// const server = https.createServer(app);
// const io = socket(server , {
//   cors: {
//     origin: '*',
//   }
// });

//socket connection and emits 
// const { socketConnection} = require('./config/socketConnection.js');

//cross
// app.use(cors());


//ejs
// app.set('view engine', 'ejs');

//body parsing jsonData
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
//routes
const logger =function(req,res,next){
  console.log(`http://localhost:9005${req.url}`)
  next()
}

app.use(logger)




//static serving
// app.use(express.static('public'));

//orgin 
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// });



// set public directory to serve static html files 
// app.use('/public', express.static(path.join(__dirname, 'public'))); 


app.use(homepageRoutes);


//customer Routes
app.use('/api/user/',userPageRoutes);

//admin Routes
app.use('/api/admin',adminPageRoutes);

//productPage Routes
app.use('/api/product/',productPageRoutes);

//plansPage Routes
app.use('/api/plan/',planPageRoutes);

//payment Routes
app.use('/api/payment/',paymentPageRoutes);

//trade routes
app.use('/api/trade/',tradePageRoutes);


//when url not found
app.use((req, res, next)=>{
    const error = new HttpError('could not found this Route', 404);
    throw error;
})

// error model middleware
app.use((error, req, res, next) => {

    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });



  //socket emits
  // socketConnection(io);


  // //mongosee connection establishment
  // mongoose.connect(process.env.MONGO_PROD_URI,{  useNewUrlParser: true , useUnifiedTopology: true ,useFindAndModify : false ,'useCreateIndex' : true })
  // .then(() => {
  //   // console.log(`server is live on ${process.env.PORT}`);
  //   // server.listen(process.env.PORT, () => {
  //   //   console.log(`server running in ${environment} mode & listening on port ${process.env.PORT}`);
  //   //   // if (environment !== 'production' && environment !== 'development' && environment !== 'testing') {
  //   //   //   console.error(
  //   //   //     `NODE_ENV is set to ${environment}, but only production and development are valid.`
  //   //   //   );
  //   //   //   process.exit(1);
  //   //  // }
  //   // });
  //   console.log('database is connected sucessfully')
  
  // })
  // .catch(err => {
  //   console.log(err.message);
  // });

  app.listen(process.env.PORT,()=>{
    console.log(`server is runnig on port ${process.env.PORT}`)
  })

