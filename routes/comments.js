var express = require('express');
var router = express.Router();
var models = require('../models');



router.post('/', function(req, res, next){
    var c = new models.comments();
    c.content = req.body.content;
    c.date = new Date();
    c._from = req.body._from;
    c._newsid = req.body._newsid;
      c.save(function(err, comment){
        if(err){
            res.json({error: err});
        }else{
            res.json(comment);
        }
    });

});



router.get('/:id', function(req, res, next) {
    models.comments.find({"_newsid": req.params.id}).exec(function(err, comments){
        if(err){
            res.json({error: err});
        }else{
            res.json(comments);
        }
    });
});




module.exports = router;