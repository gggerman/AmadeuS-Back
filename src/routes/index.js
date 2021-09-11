const { Router } = require('express');

// Importación de routers.
const products = require('./products')
const categories = require('./categories')
const users = require('./users')
const mercadopago = require('./mercadopago')
const orders = require('./orders')

const router = Router();

//Auth
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-0-knpzfi.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://api.musical.ecommerce',
  issuer: 'https://dev-0-knpzfi.us.auth0.com/',
  algorithms: ['RS256']
});

// Configurar los routers. 
// app.use(jwtCheck);
router.get('/user/manifestStripeCustomer', jwtCheck, function (req, res) {
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://dev-0-knpzfi.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"hdinEoO2VwjA8d9ZVTqVaovaWU5hdwEC","client_secret":"E_JGcr6c8zyRDjGETh-hsptgUfcDir_k73ThRoUdJ_IkhwfrDfLMoim_BU0_62yv","audience":"https://dev-0-knpzfi.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
});


// Configurar los routers.
router.use('/products', products)
router.use('/categories', categories)
router.use('/users', users)
router.use('/mercadopago', mercadopago)
router.use('/orders', orders)



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
