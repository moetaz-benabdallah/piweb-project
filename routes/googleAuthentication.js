var express = require('express');
var router = express.Router();
var google = require("googleapis");
var request = require("request");
var fs = require('fs');


var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2("944347492331-3a6l8av7unnkrkkjo39b2akmthf9c8ni.apps.googleusercontent.com", "CdSFkARN3JqqZVM4z8TNNHlJ", "http://localhost:3000/oauthcallback");
var scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/plus.me'
];
var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

router.get("/url", function(req, res) {
    res.send(url);
});

router.get("/tokens", function(req, res) {

    var code = req.query.code;

    console.log("-----> "+code);

    oauth2Client.getToken(code, function(err, tokens) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }

        /*console.log("allright!!!!");

         console.log(err);
         console.log(tokens);*/
        oauth2Client.setCredentials(tokens);

        res.json(tokens);

        request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+tokens.access_token, function (err, data) {
            console.log(data.body);

            //res.json(data.body);

        });

    });
});

router.get('/profile/:token', function (req, res) {

    request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+req.params.token, function (err, profile) {
        res.send(profile.body);
    });

});



module.exports = router;
