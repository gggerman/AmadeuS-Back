const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    /* address: {
        type: Number,
        required: true
    }, */
    phone: {
        type: Number,
    },
    favorites: [{
        ref: "Product",
		type: Schema.Types.ObjectId 
	}],
    cart: [{
        ref: "Product",
		type: Schema.Types.ObjectId,
        quantity: Number
    }],
    orders: [{
        ref: "Order",
        type: Schema.Types.ObjectId
    }],
    /* shipping:[{
		street: String,
		location: String,
		number: String,
		info: String
	}], */
    shoppingHistory: [{
        type: Array
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    },
{
    timestamps: false,
    versionKey: false,
  }
)

const User = model('User', userSchema)

module.exports = User