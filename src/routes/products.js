const express = require('express');
const products = require('../../api.products');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res, next) => {
    const { name } = req.query;

    try {
        // Busqueda en la BD por 'name'
        if (name) {
            let products = await Product.find({ name: { $regex: name, $options: 'i' } });

            if (products.length) {
                res.json(products)
            } else {
            }
            res.status(404).send('Product not found')
        }
        // Busqueda en la BD de todos los productos
        else {
            let products = await Product.find({}).populate('categories').populate('reviews', '');

            if (products.length) {
                res.json(products)
            } else {
                res.status(404).send('Product not found.')
            }
        }
    } catch (err) {
        next(err)
    }
})

// PRECARGA DE DATOS A DB
router.post('/precarga', async (req, res, next) => {
    try {
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
        res.send('Preload successful.')
    } catch (err) {
        next(err)
    }
})

router.post('/',
    body('name').isLength({ max: 300 }),
    body('description').isLength({ max: 3000 }),
    async (req, res, next) => {
    const { name, description, price, stock, brand, image, categories } = req.body;

    try {
        if (!name) return res.status(400).send("required name");
        if (!description) return res.status(400).send("required description");
        if (!price) return res.status(400).send("required price");
        if (!stock) return res.status(400).send("required stock");
        if (!image) return res.status(400).send("required image");
        if (!categories.length) return res.status(400).send("required categories");

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const product = new Product({
            name,
            description,
            price,
            stock,
            brand,
            image
        })

        const foundCategories = await Category.find({ name: { $in: categories } })
        product.categories = foundCategories.map(category => category._id)

        const savedProduct = await product.save();
        console.log(savedProduct)
        res.status(200).send('The product has been created successfully.')
    } catch (err) {
        next(err)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        product = await Product.findById(id).populate('categories').populate('reviews')
        res.send(product)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    //const { name, description, price, stock, brand, categories, image, qualification } = req.body;
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
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
        res.send('The product has been successfully modified.')
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        product = await Product.findByIdAndDelete(id)
        res.send('The product has been removed successfully.')
    } catch (err) {
        next(err)
    }
})

//Agrega la categoria al producto.
router.post('/:idProduct/category/:idCategory', async (req, res, next) => {
    const { idProduct, idCategory } = req.params;
    try{
        product = await Product.updateOne({_id: idProduct}, {$addToSet: { categories: idCategory }})
        res.send('The category has been successfully added to the product.')
    } catch (err) {
        next(err)
    }
})


//Elimina la categoria al producto.
router.delete('/:idProduct/category/:idCategory', async (req, res, next) => {
    const { idProduct, idCategory } = req.params;
    try{
        product = await Product.update({_id: idProduct}, {$pull: { categories: idCategory }})
        res.send('The category has been successfully removed from the product.')
    } catch (err) {
        next(err)
    }
})

router.post('/:idProduct/qualification/:idUser', async (req, res, next) => {
  const { idProduct, idUser } = req.params;
  const { punctuation, opinion, date, modified } = req.body;

  try {
    const product = await Product.updateOne({_id: idProduct}, {$addToSet: {qualification: {
      idUser,
      punctuation,
      opinion,
      date,
      modified}}})
    res.status(200).send('The review has been successfully added to the product.')
  } catch (e) {
    next(e);
  }
});

router.put('/:idProduct/qualification/:idQualification', async (req, res, next) => {
  const { idProduct, idQualification } = req.params;
  const { punctuation, opinion, date, modified } = req.body;

  try {
    const productFound = await Product.findById(idProduct);

    productFound.qualification.find(e => e._id === idQualification) = req.body;

    res.status(200).send('The review has been successfully modified.')
  } catch (e) {
    next(e);
  }
});

router.delete('/:idProduct/qualification/:idQualification', async (req, res, next) => {
  const { idProduct, idQualification } = req.params;

  try {
    const productFound = await Product.update({_id: idProduct}, {$pull: {qualification: {_id: idQualification}}});
    res.status(200).send('The review has been successfully removed.')
  } catch (e) {
    next(e);
  }
});

//Retorna todos los productos que tengan {valor} en su nombre o descripcion.
router.get('/search?query={valor}', async (req, res, next) => {

})

module.exports = router;
