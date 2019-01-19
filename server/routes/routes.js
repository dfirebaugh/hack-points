'use strict';

const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const bountyController = require('../controllers/bountyController');
const path = require('path');

module.exports = (app, passport, express) => {
	app.route('/api/users/')
		.get(passport.authenticate('jwt', { session: false }), userController.getAll);
	app.route('/api/users/me/')
		.get(passport.authenticate('jwt', { session: false }), userController.getMe);
	app.route('/api/users/:id')
		.get(passport.authenticate('jwt', { session: false }), userController.getUser)
	app.route('/api/users/totalPoints/')
		.get(userController.getTotalPoints);

	app.route('/api/bounties/')
		.get(bountyController.getAll)
		.post(passport.authenticate('jwt', { session: false }), bountyController.post);

	app.route('/api/bounties/:bountyid')
		.get(bountyController.get)
		.delete(passport.authenticate('jwt', { session: false }), bountyController.delete)
		.put(passport.authenticate('jwt', { session: false }), bountyController.update);

	app.route('/api/bounties/:bountyid/endorse')
		.post(passport.authenticate('jwt', { session: false }), bountyController.endorse)
	app.route('/api/bounties/:bountyid/removeEndorsement')
		.post(passport.authenticate('jwt', { session: false }), bountyController.removeEndorse)

	app.route('/register')
		.get(authController().register.get)
		.post(authController().register.post);

	app.post('/login', function (req, res, next) {

		passport.authenticate('local', { session: false }, (err, user, info) => {
			if (err || !user) {
				return res.status(400).json({
					message: 'Something is not right',
					user: user
				});
			}

			req.login(user, { session: false }, (err) => {
				if (err) {
					res.send(err);
				}

				const token = jwt.sign(user.toJSON(), 'your_jwt_secret', { expiresIn: '1d' });

				return res.json({ token: token });
			});
		})(req, res);
	});

	app.get('/login', authController().login);
	app.use('/logout', authController().logout);

	// app.get('/', indexRouter);
	app.use('build', express.static(path.join(__dirname, '../../build')));
	app.use('/', express.static(path.join(__dirname, '../../build')));

	app.get('*', (req, res) => {
		if (req.session) {
			console.log(req.session);
		}
		console.log('ok');
		res.sendFile(path.join(__dirname, '../../build', 'index.html'));
	});
	// app.use('/', express.static(path.join(__dirname, '../../public')));
};
