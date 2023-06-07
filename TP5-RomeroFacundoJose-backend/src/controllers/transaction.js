const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
	const transactions = await Transaction.find();
	res.json(transactions);
};

exports.postCreateTransaction = async (req, res) => {
	const {
		monedaOrigen,
		cantidadOrigen,
		monedaDestino,
		cantidadDestino,
		emailCliente,
		tasaConversion,
	} = req.body;

	const transaction = new Transaction({
		monedaOrigen,
		cantidadOrigen,
		monedaDestino,
		cantidadDestino,
		emailCliente,
		tasaConversion,
	});
	try {
		await transaction.save();
		res.json({
			status: '1',
			msg: 'transaccion guardada.',
		});
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando operacion.',
		});
	}
};

exports.getClientTransactions = async (req, res) => {
	const { email } = req.params;

	try {
		if (email == '') throw new Error();
		const transactions = await Transaction.find({ emailCliente: email });
		res.json(transactions);
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};

exports.getCurrencyTransactions = async (req, res) => {
	const { currencyOrigen, currencyDestino } = req.query;
	try {
		if (currencyOrigen == '' || currencyDestino == '') throw new Error();
		const transactions = await Transaction.find({
			monedaOrigen: currencyOrigen,
			monedaDestino: currencyDestino,
		});
		res.json(transactions);
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};
