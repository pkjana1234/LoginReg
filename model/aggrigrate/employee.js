const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('employee', employeeSchema)