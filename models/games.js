var mongoose = require('../config/db.js');

var GamesSchema = mongoose.Schema({
    name: String,
    start_date : Date,
    end_date : Date,
    location : String,
    score : String,
    status : String,
    sport : String,
    
    teams: [
    ],
        suggestions: [
        ]
    
    });


module.exports = mongoose.model('games', GamesSchema);