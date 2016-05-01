// Import dependencies
var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// Set up middleware
//const requireAuth = passport.authenticate('jwt', { session: false });

var User = require('../models/user');

router.post('/register', function(req, res, next) {
    //console.log(req.body.email);
    if(!req.body.email || !req.body.password) {
      res.status(400).json({ success: false, message: 'Please enter email and password.' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.status(400).json({ success: false, message: 'That email address already exists.'});
        }
        res.status(201).json({ success: true, message: 'Successfully created new user.' });
      });
    }
  });

  // Authenticate the user and get a JSON Web Token to include in the header of future requests.
  router.post('/authenticate', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user, 'longobnoxiouspassphrase', {
              expiresIn: 10080 // in seconds
            });
            res.status(200).json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  });


  router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    var user = {};
      user._id = req.user._id;
      user.email = req.user.email;
      user.role = req.user.role;
    res.send(user);
  });

module.exports = router;
