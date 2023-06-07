const mongoose = require('mongoose');
const { Schema } = mongoose;
const Spectator = require('./Spectator');

const TicketSchema = new Schema({
	precioTicket: {
		type: Number,
		required: true,
	},
	categoriaEspectador: {
		//Comprobar categoría del espectador puede ser: e = Extranjero, l = local
		type: String,
		required: true,
	},
	fechaCompra: {
		type: String,
		required: true,
	},
	espectador: {
		type: Schema.Types.ObjectId,
		ref: Spectator,
		required: true,
	},
});

module.exports =
	mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
