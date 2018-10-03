'use strict';
const SlackStrategy = require('passport-slack').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');
const crypto = require('crypto');

module.exports = function (passport)  {
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
	passport.use(new SlackStrategy({
		clientID: configAuth.slackAuth.clientID,
		clientSecret: configAuth.slackAuth.clientSecret,
		callbackURL: configAuth.slackAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		// optionally persist profile data
			process.nextTick(function () {
				User.findOne({ 'slack.id': profile.id }, function (err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						return done(null, user);
					} else {
						var newUser = new User();

						newUser.name = profile.displayName;
						newUser.email = profile.user.email;
						newUser.slack.id = profile.id;
						newUser.slack.user = profile.user;
						newUser.slack.displayName = profile.displayName;
						newUser.user.role = "Admin";
						newUser.img = profile.user.image_48;
						newUser.hackPoints = 0;

						newUser.save(function (err) {
							if (err) {
								throw err;
							}

							return done(null, newUser);
						});
					}
				});
			});
	}
));


	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use(new LocalStrategy(
		function(email, password, done) {
			process.nextTick(function () {
				User.findOne({
					email: email
				}, function(err, user) {
					if(!user || err) {
						return done(null, false, { message: 'Incorrect username or password.' });
					}
					if(verifyPassword(password, user.password)) {
						return done(null, user);
					}
					return done(null, false, { message: 'Incorrect username or password.' });
				});
			});
		}
	));
};
