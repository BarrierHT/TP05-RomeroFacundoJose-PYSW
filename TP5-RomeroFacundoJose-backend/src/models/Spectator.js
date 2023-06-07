const mongoose = require('mongoose');
const { Schema } = mongoose;
const SpectatorSchema = new Schema({
	apellido: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	dni: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});
module.exports =
	mongoose.models.Spectator || mongoose.model('Spectator', SpectatorSchema);
