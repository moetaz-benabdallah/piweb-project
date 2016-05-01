var express = require('express');
var router = express.Router();

var FB = require('fb');
FB.setAccessToken("EAAY2heuhEyQBAOXA3J3Xa1eyYZCtKfpvtbSm6OuYnjv2nTkjqt7igPyZAIdPR7NVR3aIdYTMWuwvtIdK0zm0EnbgXrAlt3FQfjXv2CD2YA6ksEl2Xxtuin4zhHNaBTVd6NgqPYQHFystK149Ide1OvZAbWHXVAxpaZAqT76J5kIbW7RprBSI");

router.get('/login', function(req, res){

  FB.getLoginUrl({
    scope: 'email,user_likes',
    redirect_uri: 'http://localhost:3000/fbService/fbProfile'
  });
  //FB.login(function(){}, {scope: 'publish_actions'});
});

router.get('/fbProfile', function(req, res){
  FB.api(
      '/me',
      'GET',
      {"fields":"id,name,birthday,email," +
      "education,first_name,favorite_teams," +
      "hometown,age_range,gender,devices,location," +
      "locale,posts,about,tagged_places,photos,picture,interested_in"},
      function(response) {
        console.log(response);
        //res.render("index.twig", {profile : response});
        res.json(response);
      }
  );

});

router.get('/fbFriends', function(req, res){


  FB.api('/me/invitable_friends','GET', {}, function(response) {

    if (!response.data)
    {
      console.error("Friends request failed: " + response);
      return;
    }
    else {
      console.log(response.data);
      res.json(response);
    }
  });


});

/*var body = 'TEST POST PI MEAN';
 FB.api('me/feed', 'post', { message: body }, function (res) {
 if(!res || res.error) {
 console.log(!res ? 'error occurred' : res.error);
 return;
 }
 console.log('Post Id: ' + res.id);
 });*/

module.exports = router;
