const express = require('express');
const products = require('../../api.products');
const Category = require('../models/Category');
const router = express.Router();
const Product = require('../models/Product')

router.get('/', async (req, res, next) => {
    const { name } = req.query;

    try {
        // Busqueda en la BD por 'name'
        if (name) {
            let products = await Product.find({ "name": { $regex: name, $options: 'i' } });

            if (products.length) {
                res.json(products)
            } else {
                res.status(404).send('No se encuentra ese producto')
            }
        }
        // Busqueda en la BD de todos los productos
        else {
            let products = await Product.find({}).populate('categories');
            if (products.length) {
                res.json(products)
            } else {
                res.status(404).send('No se encuentra ese producto')
            }
        }
    } catch (err) {
        next(err)
    }
})

// PRECARGA DE DATOS A DB
router.post('/precarga', async (req, res, next) => {
    products.forEach(async e => {
        let product = new Product({
            name: e.name,
            description: e.description,
            price: e.price,
            stock: e.stock,
            brand: e.brand,
            image: e.image,
            qualification: e.qualification,
        })
        console.log('product', product)

        const foundCategories = await Category.find({ name: { $in: e.categories } })
        product.categories = foundCategories.map(category => category._id)

        const savedProduct = await product.save();
        console.log(savedProduct)
    })
    res.send('Precarga exitosa')
})

router.post('/', async (req, res, next) => {
    const { name, description, price, stock, brand, image, categories, qualification } = req.body;

    try {
        if (!name) return res.status(400).send("required name");
        if (!description) return res.status(400).send("required description");
        if (!price) return res.status(400).send("required price");
        if (!stock) return res.status(400).send("required stock");
        if (!image) return res.status(400).send("required image");
        if (!categories.length) return res.status(400).send("required categories");

        const product = new Product({
            name,
            description,
            price,
            stock,
            brand,
            image,
            qualification
        })

        const foundCategories = await Category.find({ name: { $in: categories } })
        product.categories = foundCategories.map(category => category._id)

        const savedProduct = await product.save();
        console.log(savedProduct)
        res.status(200).send('Producto creado con éxito.')
    } catch (err) {
        console.log(err)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        product = await Product.findById(id)
        res.send(product)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    //const { name, description, price, stock, brand, categories, image, qualification } = req.body;
    try {
        const updateProduct = await Product.findByIdAndUpdate( id, req.body, {
            new: true
            /* name: name,
            description: description,
            price: price,
            stock: stock,
            brand: brand,
            categories: categories,
            image: image,
            qualification: qualification */
        });
        res.send('Producto modificado con éxito.')
    } catch (err) {
        console.log(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        product = await Product.findByIdAndDelete(id)
        res.send('The product has been removed')
    } catch (err) {
        next(err)
    }
})

//Agrega la categoria al producto.
router.post('/:idProduct/category/:idCategory', async (req, res, next) => {

})


//Elimina la categoria al producto.
router.delete('/:idProduct/category/:idCategory', async (req, res, next) => {

})

//Retorna todos los productos que tengan {valor} en su nombre o descripcion.
router.get('/search?query={valor}', async (req, res, next) => {

})

module.exports = router;