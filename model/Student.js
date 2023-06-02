const mongoose = require('mongoose');

const student = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    class:{
        type:String,
        require:true,
    }
    
});

module.exports = mongoose.model("Student", student);
