const express = require('express');
const mercadopago = require("mercadopago");
const router = express.Router();


mercadopago.configure({
    access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
  });

router.post('/checkout', (req, res) => {
    const {name, price, quantity} = req.body
    console.log(name)
	console.log(req.query)
    // crear la orden en nuestra base de datos con status "pendiente" esperando el resultado de la resp de MP
    // y cambiar el status luego de obtener la resp de MP
    let preference = {
		
		items: [{
			title: name,
			unit_price: Number(price),
			quantity: Number(quantity),
		}],
		back_urls: {
			"success": "http://localhost:3000/products",
			"failure": "http://localhost:3001/feedback",
			"pending": "http://localhost:3001/feedback"
		},
		auto_return: 'approved',
        
	};

    mercadopago.preferences.create(preference)
		.then(function (response) {
			//trabajar con la respuesta de MP
            console.log(response.body)
            global.id = response.body.id;
            res.send(response.body.init_point)
		}).catch(function (error) {
			console.log(error);
		});
        
})    

router.get('/feedback' , ( req, res) => {
    const {payment_id, status, merchant_order_id} = req.query
    console.log(req.query)
    res.send({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	})
})

module.exports = router;