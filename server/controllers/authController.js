const User = require('../models/users');
const crypto = require('crypto');


module.exports = () => {
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

  return {
    login: (req, res) => res.render('login', { title: 'Hack Points' }),
    logout: (req, res) => {
      req.logout();
      res.redirect('/login');
    },
    register: {
      get: (req, res) => {
        res.render('register', { title: 'Hack Points' });
      }
      ,
      post: (req, res) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const finish = (message, error) => {
          if (error) {
            res.send({ 'message': error })
          }
          if (message) {
            res.send({ 'message': message })
          }
        };
        const { email, name, password } = req.body;
        let errors = [];

        if (!email) {
          errors.push('Email field is required');
        }
        if (!emailRegex.test(String(email).toLowerCase())) {
          errors.push('Email field needs to contain a valid email address');
        }
        if (!name) {
          errors.push('Name field is required');
        }
        if (!password) {
          errors.push('Password field is required');
        }
        if (errors.length > 0) {
          return finish(null, errors);
        }
        const defaultProfileImage = 'https://www.gravatar.com/avatar/' +
          crypto.createHash('md5').update(email.trim().toLowerCase()).digest("hex") + '.jpg?s=200';
        const newUser = new User({
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
          if (err) {
            return finish(null, 'Server error');
          }
          if (user) {
            return finish(null, 'A user with this email address already exists');
          }
          User.create(newUser, (err, user) => {
            if (err) {
              return finish(null, 'Server error');
            }
            return finish('Successfully registered!');
          });
        });
      }
    }
  }
}
