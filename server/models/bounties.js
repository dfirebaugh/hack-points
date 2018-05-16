'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bounty = new Schema({
  title:String,
  message:String,
  status:String,
  createdBy:String,
  createdIcon:String,
  completedBy:String,
  pointValue:Number,
  dateCreated:String,
  dateCompleted:String

});

module.exports = mongoose.model('Bounty', Bounty);