var mongoose = require('../config/db.js');

var invitationsSchema = mongoose.Schema({
    objet: String,
    date: Date,
    content: String,
    communityName: String
});

module.exports = mongoose.model('invitations', invitationsSchema);
