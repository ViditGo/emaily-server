// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI)
  .then(() => { 
    console.log('connected to mongo'); // if all is ok we will be here
 })
 .catch(err => { // we will not be here...
     console.error('App starting error:', err.stack);
 });;