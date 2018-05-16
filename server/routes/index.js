'use strict';

var User = require('../models/users');
var Bounty = require('../models/bounties');
var path = process.cwd();


module.exports = function (app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(isLoggedIn, (req, res) => req.app.render(req, res, '/index', {
			routeParam: req.params.routeParam
		}));

	app.get('/login', (req, res) => req.app.render(req, res, '/login', {
		routeParam: req.params.routeParam
	}));

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get((req, res) => {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/api/v1/user/points/')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.user.hackPoints);
		});

	app.route('/api/v1/')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		});

	app.route(isLoggedIn, '/api/v1/bounties/')
	app.route('/api/v1/bounties/')
		.get(function (req, res) {
			var bounties = Bounty.find({}, function (err, doc) { res.send(doc) })
		})
		.post(isLoggedIn, function (req, res) {
			var bounty = new Bounty();
			bounty.title = req.body.title;
			bounty.message = req.body.message;
			bounty.status = req.body.status;
			bounty.pointValue = req.body.pointValue;
			bounty.completedBy = req.body.completedBy;
			bounty.createdBy = req.body.createdBy;
			bounty.createdIcon = req.body.createdIcon;


			bounty.save(function (err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Bounty created!' });
			});
			console.log(bounty)

		});


	app.route('/api/v1/bounties/:bountyid')
		.get(isLoggedIn, function (req, res) {
			console.log(req.params.bountyid)
			Bounty.findById(req.params.bountyid, function (err, doc) {
				if (err)
					res.send(err);
				res.json(doc);
			});
		})
		.delete(isLoggedIn, function (req, res) {
			Bounty.remove({
				_id: req.body._id
			}, function (err, bounty) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		})
		.put(isLoggedIn, function (req, res) {
			Bounty.findById(req.params.bountyid, function (err, bounty) {
				if (err) {
					res.send(err);
				}

				bounty.name = req.body.name;
				bounty.id = req.body._id;
				bounty.status = req.body.status;
				bounty.completedBy = req.body.completedBy;

				// save the bounty
				bounty.save(function (err) {
					if (err)
						res.send(err);

					res.json({ message: 'Bounty updated!' });
				});
			})
		})


	app.route('/api/v1/user/')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.slack.user);
		});



	// auth stuff 

	app.route('/auth/slack')
		.get(passport.authenticate('slack'));

	app.route('/auth/slack/callback')
		.get(passport.authenticate('slack', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));


};