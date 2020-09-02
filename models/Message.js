const mongoose = require('mongoose');
const { truncate } = require('fs');

const messageSchema = mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    message: {type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);