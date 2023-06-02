var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
},
    { timestamps: true });

var Address = mongoose.model('address', AddressSchema);
module.exports = Address;