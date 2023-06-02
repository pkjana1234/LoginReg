const mongoose = require('mongoose');

const subcaregory = mongoose.Schema({

    category_id: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model("Subcategory", subcaregory);
