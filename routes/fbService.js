var express = require('express');
var router = express.Router();
var models = require('../models');

var FB = require('fb');
FB.setAccessToken("CAAY2heuhEyQBAAlvuRW5OG8Xhr6jcuCcb0RXqZAfc8adZCojUZBXzOZAZBFTAHLJrJaVIqetzK6XaGq2d7VDmyGWr8yfHh4hxy2od25kELxxjI4ize5ojz8pJEBN6iPQjxVCjouHwcLgN7GZC36qsJXsaUJS5rbAX7PSXTOPfPZAfVU3A7DESVe0EnO08Gpzssr8toMzl8hUdKgPF33HDHgPiX4La7wgZAoZD");

router.get('/', function(req, res){
    res.render("fbAuthentication.twig");

});

router.get('/fbProfile', function(req, res){
    FB.api(
        '/me',
        'GET',
        {"fields":"id,name,birthday,email,education,first_name,favorite_teams,hometown,age_range,gender,devices,location,locale,posts,about,tagged_places,photos,picture,interested_in"},
        function(response) {
            console.log(response);
            //res.render("index.twig", {profile : response});
            res.json(response);
        }
    );
});

router.post('/storeUser', function(req, res, next) {
 FB.api(
  '/me',
  'GET',
  {"fields":"id,name,birthday,email,education,first_name,favorite_teams,hometown,age_range,gender,devices,location,locale,posts,about,tagged_places,photos,picture?type=large,interested_in"},
  function(response) {
      
      res.render("index.twig", {profile : response});
      var c = new models.facebook_users({
        
        id: response.id,
        name : response.name,
        birthday : response.birthday,
        email: response.email,
        first_name : response.first_name,
        favorite_teams :[ 
        {
            id : response.favorite_teams.id,
            name : response.favorite_teams.name
        }],
        posts : 
        {
            data : [
                {
                    story : response.posts.data.story,
                    created_time : response.posts.data.created_time,
                    id : response.posts.data.id
                }
            ],
            paging : 
            {
                previous : response.posts.paging.previous,
                next : response.posts.paging.next
            }},
        locale : response.locale,
        location : 
            {
                id : response.location.id,
                name : response.location.name
            }
        }
    
    );
    c.save(function(err, c){
        if(err) res.json({error: err});
        res.json(c);
    });
      
  }
      
);
    
/*
    res.render("index.twig", {profile : resp});
*/
    
    
});

module.exports = router;