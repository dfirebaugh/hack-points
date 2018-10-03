'use strict';

const User = require('../models/users');
const Bounty = require('../models/bounties');
const path = process.cwd();
const crypto = require('crypto');

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
	const hashPassword = (plainText) => {
		let rounds = 10000;
		let alg = 'sha512';
		let keyLength = 512;
        let salt = crypto.randomBytes(64).toString('hex');
        let pbkdf2 = crypto.pbkdf2Sync(
            plainText,
            salt,
            rounds,
            keyLength,
            alg
        ).toString('hex')

        return `${alg}:${keyLength}:${rounds}:${salt}:${pbkdf2}`
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

	app.route('/register').get((req, res) =>
		req.app.render(req, res, '/register', {
			routeParam: req.params.routeParam
		})
	).post((req, res) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const finish = (message, error) => {
			if(error) {
				req.flash('error', error);
			}
			if(message) {
				req.flash('success', message);
			}
			req.app.render(req, res, '/register', {
				routeParam: req.params.routeParam
			})
		};
		let { email, name, password } = req.body;
		let errors = [];

		if(!email) {
			errors.push('Email field is required');
		}
		if(!emailRegex.test(String(email).toLowerCase())) {
			errors.push('Email field needs to contain a valid email address');
		}
		if(!name) {
			errors.push('Name field is required');
		}
		if(!password) {
			errors.push('Password field is required');
		}
		if(errors.length > 0) {
			return finish(null, errors);
		}
		let defaultProfileImage = 'https://www.gravatar.com/avatar/' + 
			crypto.createHash('md5').update(email.trim().toLowerCase()).digest("hex") + '.jpg?s=200';
		let newUser = new User({
			email: email,
			name: name,
			img: defaultProfileImage,
			password: hashPassword(password),
			user: {
				role: 'ADMIN'
			}
		});
		User.findOne({
			email: email
		}, (err, user) => {
			if(err) {
				return finish(null, 'Server error');
			}
			if(user) {
				return finish(null, 'A user with this email address already exists');
			}
			User.create(newUser, (err, user) => {
				if(err) {
					return finish(null, 'Server error');
				}
				return finish('Successfully registered!');
			});
		});
	});


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
