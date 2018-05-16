'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET//,
		// 'callbackURL': process.env.APP_URL + 'auth/github/callback'
	},
	'slackAuth': {
		'clientID': process.env.SLACK_KEY,
		'clientSecret': process.env.SLACK_SECRET
	}
};