const Spectator = require('../models/Spectator');
const Ticket = require('../models/Ticket');

exports.getSpectators = async (req, res) => {
	const spectators = await Spectator.find();
	res.json(spectators);
};

exports.postCreateSpectator = async (req, res) => {
	const { apellido, nombre, dni, email } = req.body;

	const spectator = new Spectator({
		apellido,
		nombre,
		dni,
		email,
	});
	try {
		await spectator.save();
		res.json({
			status: '1',
			msg: 'espectador guardado.',
		});
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando operacion.',
		});
	}
};

exports.getSpectator = async (req, res) => {
	const spectator = await Spectator.findById(req.params.id);
	res.json(spectator);
};
