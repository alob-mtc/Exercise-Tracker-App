const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
// env
require('dotenv').config();

//connect to database
const myDB = process.env.DB_URI;  //from env
mongoose.connect(myDB, { useNewUrlParser: true, useCreateIndex: true }, (err) =>{
  if (err) {
    console.log(err);
  }
  else {
    console.log('connected to database');
  }
})
// api routes
const exerciseRoutes = require('./api/routes/exercises');
const userRoutes = require('./api/routes/users');
//middle-ware
app.use(morgan('dev'));
app.use(express.static('uploads'));
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  CRUS configuration
app.use(cors());

app.use('/exercise', exerciseRoutes);
app.use('/users', userRoutes);


//Error handling
app.use((req, res, next) =>{
  const error = new Error('Not found');
  error.status = 400;
  next(error);
})

app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
})

module.exports = app;
