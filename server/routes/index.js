'use strict';

const User = require('../models/users');
const Bounty = require('../models/bounties');
const path = process.cwd();


module.exports = (app, passport) => {
	const isLoggedIn = (req, res, next) =>  req.isAuthenticated() ?
												 next() : 
												 res.redirect('/login');
		
	// {

		// if (req.isAuthenticated()) {
		// 	return next();
		// } else {
		// 	res.redirect('/login');
		// }
	// }


	app.route('/')
		.get(isLoggedIn, (req, res) => req.app.render(req, res, '/index', {
			routeParam: req.params.routeParam
		}));

	app.get('/login', (req, res) => req.app.render(req, res, '/login', {
		routeParam: req.params.routeParam
	}));

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/login');
		});

	app.route('/')
		.get(isLoggedIn,  (req, res) => {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get((req, res) => {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/api/v1/user/points/')
		.get(isLoggedIn, (req, res) => {
			res.json(req.user.user.hackPoints);
		});

	app.route('/api/v1/')
		.get(isLoggedIn, (req, res) => {
			res.json(req.user);
		});

	app.route(isLoggedIn, '/api/v1/bounties/')
	app.route('/api/v1/bounties/')
		.get((req, res) =>  {
			var bounties = Bounty.find({}, (err, doc) => { res.send(doc) })
		})
		.post(isLoggedIn, (req, res) => {
			var bounty = new Bounty();
			bounty.title = req.body.title;
			bounty.message = req.body.message;
			bounty.status = req.body.status;
			bounty.pointValue = req.body.pointValue;
			bounty.completedBy = req.body.completedBy;
			bounty.createdBy = req.body.createdBy;
			bounty.createdIcon = req.body.createdIcon;


			bounty.save((err) => {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Bounty created!' });
			});
			console.log(bounty)

		});


	app.route('/api/v1/bounties/:bountyid')
		.get(isLoggedIn, (req, res) => {
			console.log(req.params.bountyid)
			Bounty.findById(req.params.bountyid, (err, doc) => {
				if (err)
					res.send(err);
				res.json(doc);
			});
		})
		.delete(isLoggedIn, (req, res) => {
			Bounty.remove({
				_id: req.body._id
			}, (err, bounty) => {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		})
		.put(isLoggedIn, (req, res) => {
			Bounty.findById(req.params.bountyid, (err, bounty) => {
				if (err) {
					res.send(err);
				}

				bounty.name = req.body.name;
				bounty.id = req.body._id;
				bounty.status = req.body.status;
				bounty.completedBy = req.body.completedBy;

				// save the bounty
				bounty.save( (err) => {
					if (err)
						res.send(err);

					res.json({ message: 'Bounty updated!' });
				});
			})
		})


	app.route('/api/v1/user/')
		.get(isLoggedIn, (req, res) => {
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