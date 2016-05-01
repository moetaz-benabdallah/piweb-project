var express = require('express');
var router = express.Router();
var models = require('../models');
var mongoose = require('mongoose') ;

// afficher tous les suggestions : localhost:3000/suggestion
router.get('/',function(req,res,next){
    models.suggestion.find(function(err,sugg){
        if(err){res.json({error: err});
        }else{
            res.json(sugg) ;
        }
    });
});


// afficher les suugestions accepté: localhost:3000/suggestion/accepted
router.get('/sugg_accepted',function(req,res,next){
    models.suggestion.find({status:'accepted'}, function(err,state){
        if(err){res.json({error: err});
        }else{
            res.json(state) ;
        }
    });
});

// afficher les suugestions refusé :localhost:3000/suggestion/refused
router.get('/sugg_refused',function(req,res,next){
    models.suggestion.find({status:'refused'}, function(err,state){
        if(err){res.json({error: err});
        }else{
            res.json(state) ;
        }
    });
});

// afficher les suugestions en attente : localhost:3000/suggestion/sugg_pend
router.get('/sugg_pend',function(req,res,next){
    models.suggestion.findOne({status:'pending'}, function(err,state){
        if(err){res.json({error: err});
        }else{
            res.json(state) ;
        }
    });
});

// nouvelle suggestion : localhost:3000/suggestion/new_sug
router.post('/new_sug',function(req,res,next){
    var s = models.suggestion() ;

    s.object=req.body.object ;
    s.description= req.body.description ;
    s.status=req.body.status ;
    s.creation_date=req.date ;
    s.to = req.to ;
    s.from = req.from ;

    s.save(function(err,suggestion){
        if(err) return next(err) ;
        res.json(suggestion) ;
    }) ;
}) ;


// find by ID : localhost:3000/suggestion/56df0cf41de606f01fe4a40b
router.get('/:id', function(req,res,next){
    models.suggestion.findById(req.params.id, function(err,sugg){
        if(err){
            res.json(err) ;
        } else{
            res.json(sugg) ;
        }
    }) ;
}) ;

// modification suggestion localhost:3000/suggestion/id
router.put('/:id',function(req,res,next){
    var s = models.suggestion() ;

    s.object=req.body.object ;
    s.description= req.body.description ;
    s.status=req.body.status ;
    s.creation_date=req.date ;
    s.to = req.to ;
    s.from = req.from ;

    s.update(function(err,suggestion){
        if(err) return next(err) ;
        res.json(suggestion) ;
    }) ;
}) ;

// modification des STATUS des suggestions (Accept / Refuse) : url localhost:3000/suggestion/5706bc5bec6ada6c17e845a5
router.put('/:id',function(req,res,next){
    var s = models.suggestion() ;
    models.suggestion.findByIdAndUpdate(req.params.id,{$set:{status:req.body.status}}, {new:true}, function(err,suggestion){
        if(err){
            res.json(err) ;
        }else{
            res.json(suggestion) ;
        }
    }) ;
}) ;

// Modification du STATE of Suggestion to Accept
router.put('/:id', function(req,res,next){
    models.suggestion.findOneAndUpdate(req.params.id,{$set:{status:'accepted'}}, {new:true}, function(err,sugg){
        if(err){
            res.json({error:err});
        }else{
            res.json(sugg) ;
        }
    });
});
// Supprimer une suggestion
router.delete('/:id', function(req, res, next) {
    models.suggestion.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.json({error: err});
        }else{
            res.json({done: 1});
        }
    });
});

module.exports = router;
