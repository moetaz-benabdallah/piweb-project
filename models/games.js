var mongoose = require('../config/db.js');

 var gamesSchema = mongoose.Schema({
 	name: String,
 	start_date: Date,
 	end_date: Date,
	 location : String,
 	score: String,
 	status: String,
 	sport: String,
 	_teams : [{type: mongoose.Schema.Types.ObjectId, ref: 'teams'}],
 	_location: {type: mongoose.Schema.Types.ObjectId, ref: 'grounds'},
     suggestions: [
     ]
 });

 module.exports = mongoose.model('games', gamesSchema);
