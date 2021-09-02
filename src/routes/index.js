const { Router } = require('express');

// Importación de routers. 
const products = require('./products')
const categories = require('./categories')

const router = Router();

// Configurar los routers. 
router.use('/products', products)
router.use('/categories', categories)

module.exports = router;
