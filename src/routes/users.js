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

module.exports = router;