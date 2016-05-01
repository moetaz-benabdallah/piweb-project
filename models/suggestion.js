var mongoose= require('../config/db.js') ;
var sugSchema = mongoose.Schema({
    object: String,
    description: String,
    status: String,
    creation_date: Date,
    to: String,
    from: String
}) ;

module.exports=mongoose.model('suggestion',sugSchema) ;
