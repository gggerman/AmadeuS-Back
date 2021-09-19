const { Schema, model } = require('mongoose');
//const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: false
    },
    nickname: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false
    },

    phone: {
        type: Number
    },
    shipping: [{
        type: Array
    }],
    favorites: [{
        ref: "Product",
		type: Schema.Types.ObjectId 
	}],
    cart: [{
        _id: {
            ref: "Product",
		    type: Schema.Types.ObjectId,
        },
        quantity: Number
    }],
    orders: [{
        ref: "Order",
        type: Schema.Types.ObjectId
    }],
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

/* userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
userSchema.methods.validatePassword = async function (password, newPassword) {
  return await bcrypt.compare(password, newPassword);
}; */

const User = model('User', userSchema)

module.exports = User