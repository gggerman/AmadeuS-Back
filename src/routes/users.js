const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/', async (req, res, next) => {
    const { name, surname, password, mail, phone } = req.body
    try {
        //Validaciones
        if (!name) return res.send('Debe agregar un nombre');
        if (!surname) return res.send('Debe agregar un apellido');
        if (!mail) return res.send('Debe agregar un mail');
        searchMail = await User.findOne({ mail: mail })
        if (searchMail) return res.send('El mail ya existe');

        const newUser = new User({ name, surname, password, mail, phone });
        await newUser.save();
        
        res.json('Usuario creado exitosamente')
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        user = await User.findByIdAndDelete(id)
        res.send('User has been successfully removed')
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    // const { name, surname, password, mail, phone} = req.body;
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        //res.json(updatedCategory)
        res.send('The user has been successfully modified')
    }
    catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find().populate('cart');
        //res.json(updatedCategory)
        res.send(users);
    }
    catch (err) {
        next(err)
    }
})

//Crear Ruta para agregar Item al Carrito
router.post('/:idUser/cart/:idProduct', async (req, res, next) => {
    const { idUser, idProduct } = req.params;

    try{
        user = await User.updateOne({_id: idUser}, {$addToSet: { cart: [idProduct] }})
        res.send('El item se agrego correctamente')
    } catch (err) {
        next(err)
    }
})

//Crear Ruta para vaciar el carrito
router.delete('/:idUser/cart', async (req, res, next) => {
    const { idUser } = req.params;

    try{
        user = await User.updateOne({_id: idUser}, {$unset: { cart: []}})
        res.send('El carrito quedo vacio')
    } catch (err) {
        next(err)
    }
})

//Crear Ruta para editar las cantidades del carrito
/* router.put('/:idUser/cart/:idProduct', async (req, res, next) => {
    const { idUser, idProduct } = req.params;
    const { quantity } = req.body;

    try{
        user = await User.find({_id: idUser})
        //user = user.filter(e => e._id === idProduct)
        user = user[0].cart.filter(e => e._id === idProduct)
        console.log(user)

        res.send('La cantidad de ha modificado')
    } catch (err) {
        next(err)
    }
}) */

//Crear Ruta que retorne todas las Ordenes de los usuarios
router.get('/:id/orders', async (req, res, next) => {
    const { id } = req.params;

    try {
        let user = await User.find({_id: id});
        //console.log(orders[0].orders)
        if (user[0].orders.length) {
            res.json(user[0].orders);
        } else {
            res.status(404).send('No orders found')
        }
    }
    catch (err) {
        next(err)
    }
})



module.exports = router;