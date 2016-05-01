var express = require('express');
var router = express.Router();
var models = require('../models');



router.post('/', function(req, res, next){
    var s = new models.suggestions();
    s.objet = req.body.objet;
    s.content = req.body.content;
    s.date = new Date();
    s.status = "pending";
    s._from = req.body.from ;
    s._to = req.body.to;
      s.save(function(err, suggestions){
        if(err){
            res.json({error: err});
        }else{
            res.json(suggestions);
        }
    });

});


router.get('/:id', function(req, res, next) {

    models.suggestions.find({"_to": req.params.id}).exec(function(err, suggestion){
        if(err){
            res.json({error: err});
        }else{
            res.json(suggestion);
        }
    });
});


router.get('/details/:id', function(req, res, next) {
    models.suggestions.findById(req.params.id, function(err, suggestion){
        if(err){
            res.json({error: err});
        }else{
            res.json(suggestion);
        }
    });
});


router.put('/Accept/:id', function(req, res, next) {
  
    models.suggestions.findByIdAndUpdate(req.params.id, {$set: {status: "accepted"}}, {new: true}, function(err, suggestion){
        if(err){
            res.json({error: err});
        }else{
            res.json(suggestion);
        }
    });
});


router.put('/Decline/:id', function(req, res, next) {
  
    models.suggestions.findByIdAndUpdate(req.params.id, {$set: {status: "refused"}}, {new: true}, function(err, suggestion){
        if(err){
            res.json({error: err});
        }else{
            res.json(suggestion);
        }
    });
});

module.exports = router;