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
    image: {
        type: String,
        required: true,
    },
    categories: [{
        ref: "Category",
        type: Schema.Types.ObjectId
    }],
    qualification: [{
        idUser: {
          ref: "User",
          type: Schema.Types.ObjectId
        },
        punctuation: Number,
        opinion: String,
        date: String,
        modified: String
    }],
    //compradores: [{}],
},
{
    timestamps: false,
    versionKey: false,
  }
)

const Product = model('Product', productSchema)

module.exports = Product
