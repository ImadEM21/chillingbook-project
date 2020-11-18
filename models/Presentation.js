const mongoose = require('mongoose');

const presentationSchema = mongoose.Schema({
    title: {type: String, required: false},
    description: {type: String, required: false}
});

module.exports = mongoose.model('Presentation', presentationSchema);