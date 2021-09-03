const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    /* id, */

    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
    image: {
        type: String,
        required: true,
    },
    qualification: Array,
    //compradores: [{}],
},
{
    timestamps: false,
    versionKey: false,
  }
)
// console.log('esto es una prueba')
const Product = model('Product', productSchema)

module.exports = Product