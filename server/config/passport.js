'use strict';
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const crypto = require('crypto');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function (passport) {
	const verifyPassword = (givenPassword, hashedPassword) => {
		let splits = hashedPassword.split(':')
		let hashAlg = splits[0]
		let keyLength = parseInt(splits[1])
		let rounds = parseInt(splits[2])
		let salt = splits[3]
		let pbkdf2 = splits[4]

		let testPbkdf2 = crypto.pbkdf2Sync(
			givenPassword,
			salt,
			rounds,
			keyLength,
			hashAlg
		).toString('hex')

		return testPbkdf2 === pbkdf2
	};

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	// setup the strategy using defaults

	passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
		function (email, password, done) {
			process.nextTick(function () {
				User.findOne({
					email: email
				}, function (err, user) {
					if (!user || err) {
						return done(null, false, { message: 'Incorrect username or password.' });
					}
					if (verifyPassword(password, user.password)) {
						return done(null, user);
					}
					return done(null, false, { message: 'Incorrect username or password.' });
				});
			});
		}
	));

	passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: 'your_jwt_secret'
	},
		function (jwtPayload, cb) {
			return User.findById(jwtPayload._id)
				.then(user => {
					return cb(null, user);
				})
				.catch(err => {
					return cb(err);
				});
		}
	));
};
