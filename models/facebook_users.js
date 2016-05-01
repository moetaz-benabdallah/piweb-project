var mongoose = require('../config/db.js');

var Facebook_usersSchema = mongoose.Schema({
    title: String,
    id : Number,
    name : String,
    birthday : Date,
    email : String,
    first_name : String,
    gender : String,
    age_range : String,
    favorite_teams :[ 
    {
        id : String,
        name : String
    }
        ],
    picture : String,
   
    posts : 
    {
        data : [
            {
                story : String,
                created_time : Date,
                id : String
            }
        ],
         paging : 
        {
            previous : String,
            next : String
        }
        
    },
    photos : 
    {
        data : [
            {
                story : String,
                created_time : String,
                id : String
            }
        ],
         paging : 
        {
            previous : String,
            next : String
        }
        
    },
    locale : String,
    location : 
    {
        id : String,
        name : String
    }
        
    
        
    
});

module.exports = mongoose.model('facebook_user', Facebook_usersSchema);