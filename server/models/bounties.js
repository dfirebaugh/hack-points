'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');
const joigoose = require('joigoose')(mongoose); 
const Schema = mongoose.Schema;


const joiBountySchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  status: Joi.string().required(),
  createdBy: Joi.string().required(),
  createdIcon: Joi.string().required(),
  completedBy: Joi.string(),
  pointValue: Joi.number().required(),
  dateCreated: Joi.string(),
  dateCompleted: Joi.string()
})

const mongooseBountySchema = new Schema(joigoose.convert(joiBountySchema));

module.exports = mongoose.model('Bounty', mongooseBountySchema);