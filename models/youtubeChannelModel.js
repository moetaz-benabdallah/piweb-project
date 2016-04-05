var mongoose = require('../config/db');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
    channelId : String,
    userId : String,
    channelName : String,
    channelPicture : String,
    channelDescription : String,
    views : Number,
    subscribers : Number,
    videosNumber : Number
});
module.exports = mongoose.model('channel', channelSchema);
