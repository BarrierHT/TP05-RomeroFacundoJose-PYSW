const productController = require('./../controllers/product');

const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de sectores
router.get('/get-products', productController.getProducts);
router.post('/add-product', productController.postCreateProduct);
router.put('/edit-product', productController.putEditProduct);
router.delete('/delete-product/:id', productController.deleteProduct);
router.get('/destacados', productController.getFeaturedProducts);

//exportamos el modulo de rutas
module.exports = { router: router };
