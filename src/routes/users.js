const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post('/',
    body('name').isLength({ max: 50 }),
    body('surname').isLength({ max: 50 }),
    body('password').isLength({ min: 5 }, {max: 20}),
    body('mail').isEmail().normalizeEmail(),
    async (req, res, next) => {
    const { name, surname, password, mail, phone } = req.body
    try {
        //Validaciones
        if (!name) return res.send('Debe agregar un nombre');
        if (!surname) return res.send('Debe agregar un apellido');
        if (!mail) return res.send('Debe agregar un mail');
        searchMail = await User.findOne({ mail: mail })
        if (searchMail) return res.send('El mail ya existe');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const newUser = new User({ name, surname, password, mail, phone });
        await newUser.save();

        res.json('Usuario creado exitosamente')
    }
    catch (err) {
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
        const users = await User.find();
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
