const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const vjingSchema = new Schema({
    url: String
});

const Vjing = mongoose.model("Vjing", vjingSchema);

module.exports = Vjing;