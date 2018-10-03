'use strict';

const User = require('../models/users');
const Bounty = require('../models/bounties');
const path = process.cwd();

module.exports = (app, passport) => {
	const isLoggedIn = (req, res, next) => {
		if (req.isAuthenticated() || req.method === 'OPTIONS') {
			return next();
		} else {
			req.session.error = 'Please sign in!';
			res.status(400).send();
			res.redirect('/login');
		}
	};
	app.route('/').get(isLoggedIn, (req, res) =>
		req.app.render(req, res, '/index', {
			routeParam: req.params.routeParam,
		})
	);

	app.get('/login', (req, res) =>
		req.app.render(req, res, '/login', {
			routeParam: req.params.routeParam
		})
	);

	app.route('/logout').get((req, res) => {
		req.logout();
		res.redirect('/login');
	});

	app.route('/api/users/').get(isLoggedIn, (req, res) => {
		User.find({}, (err, doc) => res.send(doc));
	});

	app.route('/api/users/currentUser/').get(isLoggedIn, (req, res) => {
		res.send(req.user);
	});

	//Returns the points of all users combined
	app.route('/api/users/totalPoints/').get(isLoggedIn, (req, res) => {
		User.find({}, (err, doc) => {
			let arr = doc.map(currItem => currItem.hackPoints);
			// console.log(arr)
			res.send({
				//summing up all the hackpoints
				totalHackPoints: arr.reduce((acc, value) => acc + value),
			});
		});
	});

	app.route('/api/bounties/')
		.get((req, res) => {
			var bounties = Bounty.find({}, (err, doc) => {
				res.send(doc);
			});
		})
		.post(isLoggedIn, (req, res) => {
			let bounty = new Bounty({
				title: req.body.title,
				message: req.body.message,
				status: req.body.status,
				pointValue: req.body.pointValue,
				createdBy: req.body.createdBy,
				createdIcon: req.body.createdIcon,
			});

			bounty.save((err, result) => {
				if (err) {
					res.json({
						err: err.message,
						id: bounty.id,
					});
				} else {
					res.json({
						message: 'success!',
						id: bounty.id,
					});
				}
			});
		});

	app.route('/api/bounties/:bountyid')
		.get(isLoggedIn, (req, res) => {
			Bounty.findById(req.params.bountyid, (err, doc) => {
				if (err) res.send(err);
				res.json(doc);
			});
		})
		.delete(isLoggedIn, (req, res) => {
			Bounty.remove(
				{
					_id: req.body._id,
				},
				(err, bounty) => {
					if (err) res.send(err);

					res.json({ message: 'Successfully deleted' });
				}
			);
		})
		.put(isLoggedIn, (req, res) => {
			Bounty.findById(req.params.bountyid, (err, bounty) => {
				if (err) {
					res.send(err);
				}

				if (req.headers.status) {
					bounty.status = req.headers.status;
				}

				bounty.points = req.headers.points;

				// save the bounty
				bounty.save(err => {
					if (err) res.send(err);
					res.json({ message: 'Bounty updated!' });
				});
			});
		});

	// auth stuff

	app.route('/auth/slack').get(passport.authenticate('slack'));

	app.route('/auth/slack/callback').get(
		passport.authenticate('slack', {
			successRedirect: '/',
			failureRedirect: '/login',
		})
	);

	app.route('/auth/github').get(passport.authenticate('github'));

	app.route('/auth/github/callback').get(
		passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login',
		})
	);

	app.route('/auth/local').post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));
};
