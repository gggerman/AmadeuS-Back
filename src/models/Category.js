
const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    /* id, */
    name: {
        type: String,
        required: true
    },
})

const Category = model('Category', categorySchema)

module.exports = Category