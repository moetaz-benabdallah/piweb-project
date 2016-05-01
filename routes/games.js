var express = require('express');
var router = express.Router();
var models = require('../models');



router.post('/', function(req, res, next){
    var g = new models.games();
    g.name = req.body.name;
    g.start_date = req.body.start_date;
    g.end_date = req.body.end_date;
    g.score = "0-0";
    g.status = "comming";
    g.sport= req.body.sport ;
    g._teams = req.body._teams;
    g._location = req.body._location;
      g.save(function(err, game){
        if(err){
            res.json({error: err});
        }else{
            res.json(game);
        }
    });

});


router.get('/:id', function(req, res, next) {

    models.games.find({"_teams": req.params.id}).exec(function(err, game){
        if(err){
            res.json({error: err});
        }else{
            res.json(game);
        }
    });
});



module.exports = router;