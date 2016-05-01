var express = require('express');
var router = express.Router();
var models = require('../models');
var multer  =   require('multer');
var fs = require('fs');


/* GET users listing. */
router.get('/grounds', function(req, res, next) {

    models.groundModel.find(function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
        //res.render('grounds/grounds.twig', { title : "Grounds list", grounds : data });
    });
});

router.get('/newground', function(req, res, next) {
    res.render('grounds/newground.twig', { title : "New ground"});
});

router.post('/newground', function(req, res, next) {

    var ground = new models.groundModel({ name : req.body.name, description : req.body.description, location : req.body.location, lat : req.body.lat, lng : req.body.lng, type : req.body.type, is_available : req.body.is_available, day : req.body.day || 0, night : req.body.night || 0, idOwner : "sdfsdf", games : [], picture : ""});
    ground.save(function (err, ground) {

        if(err){res.json(err);}
        else {res.json(ground);}
        //res.redirect('/grounds/grounds');
    });
});

router.get('/show/:q', function(req, res, next) {

    var pictures = [];

    fs.readdirSync('./public/uploads').forEach(function (file){

        if (file.indexOf(req.params.q) == 0){
            pictures.push(file);
        }
    });

    try{
        models.groundModel.find({ _id : req.params.q }, function (err, data) {
            //res.render('grounds/show.twig', { ground : data[0], pictures : pictures });
            var ground = { ground : data[0], pictures : pictures };
            //console.log(ground);
            res.json(ground);
        });
    }catch (exception){
        res.json('No ground found');
    }

});

router.post('/show/:q', function (req, res, next) {

    var id = req.params.q;
    var fileName;
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
            fileName = id + '-' + file.originalname;
            callback(null, id + '-' + file.originalname);
        }
    });
    var upload = multer({ storage : storage}).single('userPhoto');


    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        else {
            models.groundModel.find({_id: req.params.q}, function (err, ground) {
                var query = {_id: req.params.q};
                models.groundModel.update(query, {picture: fileName}, function () {
                    res.redirect('http://localhost:8000/app/#/groundDetails/' + req.params.q);
                });


            });
        }

    });
});

router.get('/delete/:q', function(req, res, next) {
    models.groundModel.remove({ _id : req.params.q }, function (err, data) {
        if(err){res.json(err);}
        else {res.json(data);}
        //res.redirect('/grounds/grounds');
    });
});

module.exports = router;
