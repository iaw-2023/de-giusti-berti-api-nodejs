const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();
router.use(cors());
const { ACCESS_TOKEN } = require('../constants.js');

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(ACCESS_TOKEN);
// cors mp
mercadopago.configure({
		access_token: ACCESS_TOKEN,
		access_control_allow_origin: '*',
		access_control_allow_methods: 'GET, POST',
		access_control_allow_headers: 'Authorization, Content-Type',
});

router.post('/', (req, res) => {
    mercadopago.payment.save(req.body)
      .then(function(response) {
        const { status, status_detail, id } = response.body;
        res.status(response.status).json({ status, status_detail, id });
      })
      .catch(function(error) {
        console.error(error);
      });
});

module.exports = router;
