const express = require('express');
const router = express.Router();
const Category = require('../models/Category')

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res, next) => {
    const { name } = req.body;
    try {
        const category = new Category({
            name,
        })
        await category.save();
        res.send('Categoría creada con éxito.')
    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true
        })
        //res.json(updatedCategory)
        res.send('La categoria fue modificada correctamente')
    } catch(err) {
        console.log(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        category = await Category.findByIdAndDelete(id)
        res.send('El producto ha sido removido')
    } catch(err) {
        console.log(err)
    }
})

module.exports = router;
