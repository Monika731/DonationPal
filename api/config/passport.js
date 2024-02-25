const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');

let authenticateLogin = async (email, password, cb) => {
    UserModel.findOne({email})
    .then(async (user) => {
        if (!user) {
            return cb(null, false);
        }
        const isValidPwd = await user.isValidPassword(password);

        if (isValidPwd) {
            return cb(null, user);
        } else {
            return cb(null, false);
        }
    })
    .catch((err) => {
        cb(err);
    });
};

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      authenticateLogin
    )
);