var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    models.eventModel.find(function (err, events) {
        if(err){res.json(err);}
        else {res.json(events);}
    });
});

router.get('/:q', function(req, res, next) {
    models.eventModel.find({ _id : req.params.q }, function (err, events) {
        if(err){res.json(err);}
        else {res.json(events);}
    });
});

router.post('/newEvent', function(req, res, next) {
    var event = new models.eventModel({ name : req.body.name, description : req.body.description,
    date : req.body.date, groundID : req.body.groundID, price : req.body.price, team1ID : req.body.team1ID,
        team2ID : req.body.team1ID});
    event.save(function (err, response) {
        if(err){res.json(err);}
        else {
            res.io.emit("notification", response);
            res.json(response);
        }
    });

});

router.get('/delete/:q', function(req, res, next) {
    models.eventModel.remove({ _id : req.params.q }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
    });
});

module.exports = router;
