const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const mongoosePaginate = require('mongoose-paginate-v2');


const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
   
    status: {
        type: Boolean,
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// PostSchema.plugin(mongoosePaginate);


const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;