var mongoose = require('../config/db.js');

var newsSchema = mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    communityName: {type: mongoose.Schema.Types.ObjectId, ref: 'teams'},
    photo: String
});

module.exports = mongoose.model('news', newsSchema);
