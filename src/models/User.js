const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    pass: {
        type: Number,
        required: true
    },
    /* address: {
        type: Number,
        required: true
    }, */
    phone: {
        type: Number,
        required: true,
    },
    favorites: [{
        ref: "Product",
		type: Schema.Types.ObjectId 
	}],
    cart: [{
        ref: "Product",
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
        type: Boolean
    },
    },
{
    timestamps: false,
    versionKey: false,
  }
)

const User = model('User', userSchema)

module.exports = User