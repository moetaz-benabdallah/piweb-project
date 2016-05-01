var mongoose = require('../config/db.js');

var suggestionsSchema = mongoose.Schema({
    objet: String,
    content: String,
    date: Date,
    status: String,
    _from: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    _to: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
});

module.exports = mongoose.model('suggestions', suggestionsSchema);
