const express = require('express');
const router = express.Router();
const Category = require('../models/Category')
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    }
    catch (err) {
        next(err)
    }
})

/* router.post('/', async (req, res, next) => {
    const { name } = req.body;
    try {
        const category = new Category({
            name,
        })
        await category.save();
        res.send('The category has been created successfully')
    } catch (err) {
        next(err)
    }
}) */
router.post('/',
    body('name').isLength({ max: 80 }),
    async (req, res, next) => {
    let { name } = req.body;
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    try {
        let categories = await Category.find({ name: name});
        if(categories.length){
            console.log(categories)
        res.status(404).send('The category is already created')
    } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const category = new Category({
            name,
        })
        await category.save();
        res.send('The category has been created successfully')
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true
        })
        //res.json(updatedCategory)
        res.send('The category has been successfully modified')
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        category = await Category.findByIdAndDelete(id)
        res.send('The category has been removed successfully')
    } catch (err) {
        next(err)
    }
})

module.exports = router;
