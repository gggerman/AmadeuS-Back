const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    buyer: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    /* products: [
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
    ], */
    products: [{
        ref: "Product",
        type: Schema.Types.ObjectId
    }],
    status: {
        type: String,
        default:"Pending",
        required: true
    },
    shipping: [{
		street: String,
		location: String,
		number: Number,
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
