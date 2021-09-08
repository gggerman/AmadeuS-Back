const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/', async (req, res, next) => {
    const { name, surname, password, mail, phone } = req.body
    try {
    searchMail = await User.findOne({mail: mail})
    
    if(searchMail) return res.send('El mail ya existe');
    
    const newUser = new User({
        name,
        surname,
        password,
        mail,
        phone
    }) 
    
    await newUser.save();
    res.json('Usuario creado exitosamente')

    }
    catch (err) {
        next(err)
    }
})

//Crear Ruta para agregar Item al Carrito
router.post('/:idUser/cart/:idProduct', async (req, res, next) => {
    const { idUser, idProduct } = req.params;
    try{
        user = await User.updateOne({_id: idUser}, {$addToSet: { cart: idProduct }})
        res.send('El item se agrego correctamente')
    } catch (err) {
        next(err)
    }
})

//Crear Ruta para vaciar el carrito
router.delete('/:idUser/cart', async (req, res, next) => {
    const { idUser } = req.params;
    try{
        user = await User.updateOne({_id: idUser}, {$unset: { cart: 1}})
        res.send('El carrito quedo vacio')
    } catch (err) {
        next(err)
    }
})


module.exports = router;