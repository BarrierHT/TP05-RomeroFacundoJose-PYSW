const Ticket = require('../models/Ticket');

exports.getTickets = async (req, res) => {
	const tickets = await Ticket.find()
		.populate({ path: 'espectador' })
		.select('-__v');
	res.json(tickets);
};

exports.postCreateTicket = async (req, res) => {
	const { precioTicket, categoriaEspectador, fechaCompra, espectador } =
		req.body;
	const ticket = new Ticket({
		precioTicket,
		categoriaEspectador,
		fechaCompra,
		espectador,
	});
	try {
		await ticket.save();
		res.json({
			status: '1',
			msg: 'Ticket guardado.',
		});
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando operacion.',
		});
	}
};

exports.putEditTicket = async (req, res) => {
	const ticket = new Ticket(req.body);
	try {
		const ticketUpdated = await Ticket.updateOne(
			{ _id: req.body._id },
			ticket
		);

		if (ticketUpdated.matchedCount > 0) {
			res.json({
				status: '1',
				msg: 'Ticket actualizado',
			});
		} else {
			res.json({
				status: '2',
				msg: 'Ticket no encontrado',
			});
		}
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};

exports.deleteTicket = async (req, res) => {
	try {
		const ticketDeleted = await Ticket.deleteOne({ _id: req.params.id });

		if (ticketDeleted.deletedCount > 0) {
			res.json({
				status: '1',
				msg: 'Ticket eliminado',
			});
		} else {
			res.json({
				status: '2',
				msg: 'Ticket no encontrado',
			});
		}
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};

exports.getTicketByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		if (category == '') throw new Error();

		console.log(category);

		let spectators = await Ticket.find({
			categoriaEspectador: category,
		}).populate({ path: 'espectador' });
		// .select('-_id espectador');
		// ? Traer solo espectador o todo el ticket
		// let spectatorsMapped = spectators.map(
		// 	spectatorObj => spectatorObj.espectador
		// );

		const spectatorsMapped = [...new Set(spectators)];

		res.json(spectatorsMapped);
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};
