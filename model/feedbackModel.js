const mongoose = require('mongoose');

const feedback = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        default:'1'
    },
    comment:{
        type:String,
        require:true,
    },
    
});

module.exports = mongoose.model("Feedback", feedback);
