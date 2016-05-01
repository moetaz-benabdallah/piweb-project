var express = require('express');
var router = express.Router();
var Twit = require('twit');
var models = require('../models');

var T = new Twit({
  consumer_key:         'cUoieVVHmmLsN7hZLrQ3Pi0Yw',
  consumer_secret:      'D3nmdbOIzw8dN1BpdfqHi9XhM3t0DpuRezIKIkB5eE6ktwjvhR',
  access_token:         '2704181018-qGv4GONSOFJx54KQSlwkL6nuLceffjjqyU7dk6Y',
  access_token_secret:  'vxGc2IDbxpRWgw2UbywgTfSTkln8CKS7kyCaSnrYOVaqE',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
var TWEET_COUNT = 15;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_FREINDS_URL = 'friends/list';
var COMMUNITY_TIMELINE_URL = 'statuses/user_timeline';

/**
 * GET tweets json.
 */
router.get('/freinds/:screenname', function(req, res) {

   tweets = [],

  params = {
   /* screen_name: 'KadriHaifa'*/
   screen_name: req.body.screenname, // the user id passed in as part of the route
    count: 10 // how many tweets to return
  };

  // the max_id is passed in via a query string param
  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data 
  T.get(USER_FREINDS_URL, params, function (err, data, resp) {
      
    tweets = data;
    

    /*res.render('listfreind.twig',{list:tweets});*/
    res.json(tweets);
  
  });
});



router.get('/history', function(req, res) {

   tweets = [],

  params = {
    screen_name: 'PalySportNow', // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };

  // the max_id is passed in via a query string param
  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data 
  T.get(COMMUNITY_TIMELINE_URL, params, function (err, data, resp) {

    tweets = data;
   
res.json(tweets);

    /*res.render('history.twig',{history:tweets});*/
  });
});



router.get('/invite/:screenname', function(req, res) {

  
var screenName = req.params.screenname;
  // request data 
T.post('direct_messages/new',{text: 'you are invited to be a member of ESPRIT community ', screen_name:screenName}, function(err, data, response) {
  console.log(data);
  res.redirect('/tweeter/freinds');
});

});



router.post('/add', function(req, res) {

var statut = req.body.content;
 console.log(statut);
  // request data 
T.post('statuses/update',{ status: statut}, function(err, data, response) {
  console.log(statut);
  res.redirect('/tweeter/history');
});

});



router.get('/profile', function(req, res) {

  
var screenName = req.params.screenname;
  // request data 
T.get('users/show',{screen_name: 'KadriHaifa'}, function(err, data, response) {
  console.log(data);
  res.render('profile.twig',{profile:data});
});

});


router.post('/news', function(req, res, next) {
    var n = new models.news();
    n.title = req.body.title;
    n.date = new Date();
    n.description = req.body.description;
    n.communityName = req.body.communityName;
    n.photo = req.body.photo;
    n.save(function(err, news){
        if(err){
            res.json({error: err});
        }else{
            res.json(news);
        }
    });
});

router.get('/news', function(req, res, next) {

  var start = new Date();
  var startDate = start.toDateString();
  console.log(startDate);

  var end = new Date();
  end.setDate(start.getDate()-7);
  var endDate = end.toDateString();



    models.news.find({"date": { "$gt": endDate}}).exec(function(err, news){
        if(err){
            res.json({error: err});
        }else{
            res.json(news);
        }
    });
});


router.get('/news/community/:id', function(req, res, next) {

    models.news.find({"communityName": req.params.id}).exec(function(err, news){
        if(err){
            res.json({error: err});
        }else{
            res.json(news);
        }
    });
});


router.delete('/deletenews/:id', function(req, res, next) {
    models.news.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.json({error: err});
        }else{
            res.json({done: 1});
        }
    });
});


router.put('/updatenews/:id', function(req, res, next) {
    models.news.findByIdAndUpdate(req.params.id, {$set: {title: req.body.title, description:req.body.description}}, {new: true}, function(err, category){
        if(err){
            res.json({error: err});
        }else{
            res.json(category);
        }
    });
});



router.get('/news/:id', function(req, res, next) {
    models.news.findById(req.params.id, function(err, news){
        if(err){
            res.json({error: err});
        }else{
            res.json(news);
        }
    });
});

/*router.post('/invitations', function(req, res, next) {
    var i = new models.invitations();
    i.objet = req.body.objet;
    i.date = new Date();
    i.content = req.body.content;
    i.communityName = req.body.communityName;
   
    i.save(function(err, invitations){
        if(err){
            res.json({error: err});
        }else{
            res.json(invitations);
        }
    });
});


router.get('/owninvitations', function(req, res, next) {
     models.invitations.find().exec(function(err, invitation){
        if(err){
            res.json({error: err});
        }else{
            res.json(invitation);
        }
    });
});*/









/*Base de données*/

/*  tweets = [],

  params = {
    screen_name: 'KadriHaifa', // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };

  T.get(COMMUNITY_TIMELINE_URL, params, function (err, data, resp) {
   

     tweets = [],
    tweets = data;
    for (var i = tweets.length - 1; i >= 0; i--) {
       var tw = new models.tweets({text:tweets[i].text,created_at:tweets[i].created_at,screen_name:tweets[i].user.screen_name});
    tw.save();
      console.log('test');
    };
 
  });
*/
 

/*Fin base de données*/


  module.exports = router;