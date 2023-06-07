const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	imagen: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	destacado: {
		type: Boolean,
		required: true,
	},
});
module.exports =
	mongoose.models.Product || mongoose.model('Product', ProductSchema);
