var mongoose = require('../config/db');

 var commentsSchema = mongoose.Schema({
 	content: String,
 	date: Date,
 	_from: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
 	_newsid: {type: mongoose.Schema.Types.ObjectId, ref: 'news'}

 });

 module.exports = mongoose.model('comments', commentsSchema);
