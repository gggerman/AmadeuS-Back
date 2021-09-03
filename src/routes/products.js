const express = require('express');
const products = require('../../api.products');
const router = express.Router();
const Product = require('../models/Product')


router.get('/', async (req, res, next) => {
    products.forEach(async e => {
        let product = new Product({
            name: e.name,
            description: e.description,
            price: e.price,
            stock: e.stock,
            brand: e.brand,
            categories: e.categories,
            image: e.image,
            qualification: e.qualification, 
        })
        console.log({ 'product': product })
        await product.save();
    })
    try {
        console.log('entre a  products')
        const products = await Product.find({});
        console.log(products)
        res.json(products);
    }
    catch (err) {
        console.log(err)
    }
})


router.post('/', async (req, res, next) => {
    const { name, description, price, stock, brand, categories, image, qualification } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            stock,
            brand,
            categories,
            image,
            qualification
        })
        await product.save();
        res.status(200).send('Producto creado con éxito.')
    } catch (err) {
        console.log(err)
    }
});

router.get('/:id', async (req, res, next) => {

})

router.put('/:id', async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {

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