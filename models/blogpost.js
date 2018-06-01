const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const blogpostSchema = new Schema({
    title: String,
    message: String
});

const BlogPost = mongoose.model("BlogPost", blogpostSchema);

module.exports = BlogPost;