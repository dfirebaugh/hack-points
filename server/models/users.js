'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');
const joigoose = require('joigoose')(mongoose); 
const Schema = mongoose.Schema;

const joiUserSchema = Joi.object({
	name: Joi.string().required(),
	hackPoints: Joi.number(),
	img: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
	user: {
		name:  Joi.string(),
		role:  Joi.string().required()
	},
	github: {
		id:  Joi.string(),
		displayName:  Joi.string(),
		username:  Joi.string(),
		publicRepos:  Joi.number()
	},
	slack: {
		id:  Joi.string(),
		displayName:  Joi.string(),
		user: {
			image_1024:  Joi.string(),
			image_512:  Joi.string(),
			image_192:  Joi.string(),
			image_72:  Joi.string(),
			image_48:  Joi.string(),
			image_32:  Joi.string(),
			email:  Joi.string(),
			id:  Joi.string(),
			name:  Joi.string()
		}
	}
})

const mongooseUserSchema = new Schema(joigoose.convert(joiUserSchema));



module.exports = mongoose.model('User', mongooseUserSchema);
