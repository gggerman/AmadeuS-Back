const express = require('express');
const router = express.Router();
const Order = require('../models/Order')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (orders) {
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
    const order = await Order.findById(id)

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
