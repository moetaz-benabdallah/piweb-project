var express = require('express');
var router = express.Router();
var request = require('request')
var models = require('../models');


var urlDetailsChaine = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails%2C+statistics%2Csnippet&id=UCWJ2lWNubArHWmf3FIHbfcQ&key=AIzaSyCj89QbaK6TT8x9JI548kh0pm2l0jc8AgA';
var urlCommentsVideo = 'https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCj89QbaK6TT8x9JI548kh0pm2l0jc8AgA&textFormat=plainText&part=snippet&videoId=caYyIyEsw7w&maxResults=50';

router.get('/chaineVideos/:q', function (req, res, next) {
    request('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername='+req.params.q+'&key=AIzaSyCj89QbaK6TT8x9JI548kh0pm2l0jc8AgA', function (err, response){
        //console.log(JSON.parse(response.body).items[0].contentDetails.relatedPlaylists.uploads);
        request('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+JSON.parse(response.body).items[0].contentDetails.relatedPlaylists.uploads+'&key=AIzaSyCj89QbaK6TT8x9JI548kh0pm2l0jc8AgA', function (err, data) {
            //res.send(JSON.parse(data.body).items);
            res.render('channelVideos.twig',{ videos : JSON.parse(data.body).items});
        });
    });
});

router.get('/chaineDetails/:q', function (req, res, next) {
    request('https://www.googleapis.com/youtube/v3/channels?part=contentDetails%2C+statistics%2Csnippet&id='+req.params.q+'&key=AIzaSyCj89QbaK6TT8x9JI548kh0pm2l0jc8AgA', function (err, response){
        console.log(JSON.parse(response.body));
        var statistics = JSON.parse(response.body).items[0].statistics;
        var title = JSON.parse(response.body).items[0].snippet.title;
        var description = JSON.parse(response.body).items[0].snippet.description;
        var picture = JSON.parse(response.body).items[0].snippet.thumbnails.medium.url;
        res.render('channelDetails.twig', { statistics : statistics, title : title, description: description, picture : picture});
    });
});

router.get('/like/:search/:id', function (req, res, next){
    var channel = new models.youtubeChannelModel({ channelId : req.params.id, userId : "testhqd5"});

    models.youtubeChannelModel.find({ channelId : req.params.id}, function (err, data) {
        if(data.length == 0){
            channel.save(function () {
                res.redirect('/videos/search/'+req.params.search);
            });
        }
        else res.redirect('/videos/search/'+req.params.search);
    });
});


router.get('/videoComments', function (req, res, next) {
    request(urlCommentsVideo, function (err, response){
        res.send(JSON.parse(response.body));
    });
});

module.exports = router;
