'use strict';
const SlackStrategy = require('passport-slack').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

module.exports = function (passport)  {
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
};
