var mongoose = require('../config/db.js');

 var teamsSchema = mongoose.Schema({
 	name: String,
 	slug: String,
 	is_community: Boolean,
 	description: String,
 	members : [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
 	suggestion: [{type: mongoose.Schema.Types.ObjectId, ref: 'suggestions'}]
 });

 module.exports = mongoose.model('teams', teamsSchema);
