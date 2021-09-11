const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    buyer: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    products: [
        {
            _id:{
                ref: "Product",
                type: Schema.Types.ObjectId
            },
            price: Number,
            title: String,
            quantity: Number,
            image: String,
            review: {
                type: String,
                default: 'NoReview'
            }
        }
    ],
    status: {
        type: String,
        default:"Pending",
        required: true
    },
    shipping: [{
		street: String,
		location: String,
		number: String,
		info: String
	}],
    payment: {
        type: String,
        default:""
    },
    },
{
    timestamps: false,
    versionKey: false,
  }
)

const Order = model('Order', orderSchema)

module.exports = Order
