const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const membreSchema = new Schema({
    pic: String, 
    nom: String, 
    contact: String, 
    site: String, 
    description: String, 
    image: [],
    vidéo : []
});

const Membre = mongoose.model("Membre", membreSchema);

module.exports = Membre;