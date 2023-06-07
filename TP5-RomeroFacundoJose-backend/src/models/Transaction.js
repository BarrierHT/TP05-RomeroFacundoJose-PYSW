const mongoose = require('mongoose');
const { Schema } = mongoose;
const TransactionSchema = new Schema({
	monedaOrigen: {
		type: String,
		required: true,
	},
	cantidadOrigen: {
		type: Number,
		required: true,
	},
	monedaDestino: {
		type: String,
		required: true,
	},
	emailCliente: {
		type: String,
		required: true,
	},
	tasaConversion: {
		type: Number,
		required: true,
	},
	cantidadDestino: {
		type: Number,
	},
});

TransactionSchema.pre('save', function (next) {
	this.cantidadDestino = this.cantidadOrigen * this.tasaConversion;
	next();
});

TransactionSchema.set('toJSON', { virtuals: true });

module.exports =
	mongoose.models.Transaction ||
	mongoose.model('Transaction', TransactionSchema);
