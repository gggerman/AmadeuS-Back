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

module.exports = router;