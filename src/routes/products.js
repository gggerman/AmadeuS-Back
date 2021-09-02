const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Funcionan las rutas')
})

module.exports = router;