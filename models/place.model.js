const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const placeSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['coffee shop', 'bookstore']
    }
}, { timestamps: true });



module.exports = model("Place", placeSchema);