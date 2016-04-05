var mongoose = require('../config/db');
var Schema = mongoose.Schema;

var groundSchema = new Schema({
    name : String,
    description : String,
    location : String,
    type : String,
    is_available : Number,
    day : Number,
    night : Number,
    games : [],
    idOwner : String,
    picture : String
});
module.exports = mongoose.model('ground', groundSchema);
