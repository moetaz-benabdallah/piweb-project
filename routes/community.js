var express = require('express');
var router = express.Router();
var models = require('../models');



router.post('/', function(req, res, next){
	var t = new models.teams();
	t.name = req.body.name;
	t.slug = req.body.slug;
	t.is_community = req.body.is_community;
	t.description = req.body.description;
	  t.save(function(err, teams){
        if(err){
            res.json({error: err});
        }else{
            res.json(teams);
        }
    });

});


router.get('/', function(req, res, next) {

    models.teams.find({"is_community": true}).exec(function(err, teams){
        if(err){
            res.json({error: err});
        }else{
            res.json(teams);
        }
    });
});

router.get('/all', function(req, res, next) {

    models.teams.find().exec(function(err, teams){
        if(err){
            res.json({error: err});
        }else{
            res.json(teams);
        }
    });
});


router.get('/:id', function(req, res, next) {
    models.teams.findById(req.params.id).populate('members').exec(function(err, teams){
        if(err){
            res.json({error: err});
        }else{
            res.json(teams);
        }
    });
});







module.exports = router;