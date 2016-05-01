/**
 * Created by hamdi_chebbi on 11/03/2016.
 */
var express = require('express');
var router = express.Router();
var models = require('../../models')
var mongoose = require('mongoose') ;




/* Referee */
// tous les referee : url : localhost:3000/referee
router.get('/' , function(req,res,next){


    models.users.find(function (err,result) {

        if(err){
            res.json({error: err});
        }
        else{
            res.json(result);
        }

    });
}) ;

// user by Id url : localhost:3000/referee/56deffc31de606f01fe4a405
router.get('/:id', function(req,res,next){
    models.users.findById(req.params.id, function(err,users){
        if(err){
            res.json(err) ;
        } else{
            res.json(users) ;
        }
    }) ;
}) ;



// fonction lors le clic sur "enregistrer " url : localhost:3000/referee/new_referee
router.post('/new_referee',function(req,res,next){
    var r = new  models.users() ;
    r.first_name=req.body.fist_name ;
    r.last_name = req.body.last_name ;
    r.email= req.body.email ;
    r.phone=req.body.phone ;
    r.timeline.title= req.body.title ;
    r.timeline.date_game= req.body.date ;
    r.timeline.description= req.body.description ;


    r.save(function(err,user){
        if(err) return next(err);
        else{
            res.json(user) ;
        }

    }) ;
}) ;


router.get('/lol',function(req,res){
    res.render('insta.twig',{title:'hello'});
});



// new timeline
router.put('/:id', function(req,res,next){
    // var referee = new models.user() ;
    models.users.findByIdAndUpdate(req.params.id,{$set: {description : req.body.description}}, {new:true} , function(err,user){
        if(err){
            res.json({error :err}) ;
        } else{
            res.send(user) ;
        }
    });
});

//// get timeline
//router.get('/:id',function(req,res){
//    models.users.find()
//})

module.exports = router;
