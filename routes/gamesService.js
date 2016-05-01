var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    models.games.find({}).exec(function(err, games){
        if(err) res.json({error: err});
       // res.render("games.twig", {games : games});

        res.json(games);

    });
});

router.get('/create', function(req, res, next) {
    res.render('organizeGame.twig', { title: 'Organize new game' });
});

router.post('/store', function(req, res, next) {
    var c = new models.games({
        name: req.body.name,
    start_date : req.body.start_date,
    location : req.body.location,

    status : "Pending",
    sport : req.body.sport


    });
    c.save(function(err, response){
        if(err){ res.json({error: err});}
        else{
            res.io.emit("A_new_game_added", response);
            res.json(response);
        }

           // res.redirect('/games');
    });
});

module.exports = router;
