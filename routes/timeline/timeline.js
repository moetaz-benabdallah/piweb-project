/**
 * Created by hamdi_chebbi on 11/03/2016.
 */
// récupérer tous les timeline d'un referee et en ajouter un nouveau
var express = require('express');
var router = express.Router();
var models = require('../../models') ;
var mongoose = require('mongoose') ;


router.get('/',function(req,res,next){
    res.json('hello timeline') ;
}) ;

router.post('/newGame', function(req,res,next){
    var referee = new  models.user() ;
    //referee.timeline.date_game = req.body.date ;
    referee.timeline.description=req.body.description ;
    //console.log( req.body.description) ;
    // referee.first_name=req.body.fist_name ;
    referee.save(function(err){
        if (err) next(err) ;
        res.json('Nice -- New Game added in the referee timeline') ;
    })
});

module.exports = router;
