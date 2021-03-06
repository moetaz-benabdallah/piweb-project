var mongoose = require('../config/db');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name : String,
    description : String,
    start_date : Date,
    groundID : String,
    price : Number,
    team1ID : String,
    team2ID : String
});
module.exports = mongoose.model('event', eventSchema);
