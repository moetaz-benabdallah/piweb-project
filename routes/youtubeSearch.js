var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/search/:q', function (req, res, next) {

    request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q='+req.params.q+'&key=AIzaSyCj89QbaK6TT8x9JI548kh0pm2l0jc8AgA', function (err, data) {
        var random = Math.floor(Math.random() * (48 - 1)) + 1;
        console.log(JSON.parse(data.body).items[random]);
        console.log(JSON.parse(data.body).items[random].snippet.channelTitle);
        console.log(JSON.parse(data.body).items[random].snippet.channelId);
        res.render('youtubeSearch.twig', { search : JSON.parse(data.body).items[random], channel : JSON.parse(data.body).items[random].snippet.channelTitle, channelDetails : JSON.parse(data.body).items[random].snippet.channelId, word : req.params.q});
    });
});



module.exports = router;
