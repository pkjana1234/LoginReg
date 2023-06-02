var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    views: {
        type: String,
        required: true
    },
},
    { timestamps: true });

var Address = mongoose.model('article', ArticleSchema);
module.exports = Address;