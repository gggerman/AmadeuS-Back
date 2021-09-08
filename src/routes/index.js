const { Router } = require('express');

// Importación de routers. 
const products = require('./products')
const categories = require('./categories')
const users = require('./users')

const router = Router();

// Configurar los routers. 
router.use('/products', products)
router.use('/categories', categories)
router.use('/users', users)

module.exports = router;

/* 
LISTADO DE RUTAS
RUTAS GET
    /products 
    /products?name=guitarra eléctrica
    /products/:id
    /categories

RUTAS POST
    /products
    /products/precarga
    /categories
    /:idProduct/category/:idCategory

RUTAS DELETE
    /products/:id
    /categories/:id
    /:idProduct/category/:idCategory
    
RUTAS PUT
/products/:id
/categories/:id

*/