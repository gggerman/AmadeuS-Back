const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

router.post('/', async (req, res, next) => {
  const { buyer, phone, products, shipping, payment, date } = req.body;

  try {
    const newOrder = new Order({ 
      phone, 
      shipping, 
      payment,
      date
    });
    const foundUser = await User.findOne({ _id: buyer } )
    newOrder.buyer = foundUser
    
    const foundProducts = await Product.find({ name: { $in: products } })
    newOrder.products = foundProducts.map(product => product._id)

    if (newOrder) {
      const savedOrder = await newOrder.save();
      console.log('este es el id de la orde ' + savedOrder._id)
      userOrder = await User.updateOne({ _id: buyer }, {$addToSet: { orders: [savedOrder] }})
      return res.status(200).send('The order has been created successfully.')
    }
    return res.status(404).send('Error: the order has not been created.')
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().populate('products').populate('buyer');
    if (orders.length) {
      return res.status(200).send(orders);
    }
    return res.status(404).send('Orders not found.')

  } catch (e) {
      next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('products').populate('buyer')

    if (order) {
      return res.status(200).send(order);
    }
    return res.status(404).send('Order not found.')

  } catch (e) {
      next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id) {
      const orderUpdated = await Order.findByIdAndUpdate(id, req.body, {new: true});

      return res.status(200).send('The order has been successfully modified.')
    }
    return res.status(404).send('Order not found.')

  } catch (e) {
      next(e);
  }
});

module.exports = router;
