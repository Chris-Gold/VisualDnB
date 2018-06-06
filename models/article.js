const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const articleSchema = new Schema({
    url: String,
    titre: String,
    date: String,
    description: String,
    photos: {
        url1: String,
        url2: String
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;