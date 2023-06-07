const transactionController = require('./../controllers/transaction');

const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de sectores
router.get('/get-transactions', transactionController.getTransactions);
router.post('/add-transaction', transactionController.postCreateTransaction);

router.get(
	'/get-client-transactions/:email',
	transactionController.getClientTransactions
);

router.get(
	'/get-currency-transactions',
	transactionController.getCurrencyTransactions
);

//exportamos el modulo de rutas
module.exports = { router: router };
