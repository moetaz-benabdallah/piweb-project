var mongoose = require('../config/db.js');

var tweetsSchema = mongoose.Schema({
    text: String,
    created_at: String,
    screen_name: String
});

module.exports = mongoose.model('tweets', tweetsSchema);
