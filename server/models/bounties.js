'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');
const joigoose = require('joigoose')(mongoose);
const Schema = mongoose.Schema;

const joiBountySchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  status: Joi.string().required(),
  createdBy: Joi.object().required(),
  createdIcon: Joi.string(),
  completedBy: Joi.string(),
  dateCreated: Joi.string(),
  dateCompleted: Joi.string(),
  endorsements: Joi.array().unique().items(Joi.string()),
  submissionBoard: Joi.array()
})

const mongooseBountySchema = new Schema(joigoose.convert(joiBountySchema));

module.exports = mongoose.model('Bounty', mongooseBountySchema);