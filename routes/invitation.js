var express = require('express');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var router = express.Router();
var models = require('../models');





router.get('/', function(req, res, next) {
     models.users.find({"email":  {$exists : true} }).exec(function(err, users){
        if(err){
            res.json({error: err});
        }else{
            res.json(users);
        }
    });
});




router.get('/:email', function(req, res, next) {

var email = req.params.email;

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://kadrihaifa%40gmail.com:lfi31992@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'kadrihaifa@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'PlaySportNow: Invitation to play ✔', // Subject line
    text: 'Hello world',
    html: '<img src="../images/aaa.png" /><b>You are invited to play a game</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

});

module.exports = router;