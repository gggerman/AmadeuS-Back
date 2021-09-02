const { Router } = require('express');

// Importación de routers. 
const products = require('./products')

const router = Router();

// Configurar los routers. 
router.use('/products', products)

module.exports = router;

