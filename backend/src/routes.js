const express = require('express');
const ProductController = require('./controllers/ProductController');
const PurchasesController = require('./controllers/PurchasesController');

const routes = express.Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.post('/purchase', PurchasesController.store);

module.exports = routes;