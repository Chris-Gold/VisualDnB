const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const audreactSchema = new Schema({
    url: String
});

const Audreact = mongoose.model("Audreact", audreactSchema);

module.exports = Audreact;