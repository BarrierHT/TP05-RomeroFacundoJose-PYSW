const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
	const products = await Product.find();
	res.json(products);
};

exports.postCreateProduct = async (req, res) => {
	const { nombre, descripcion, imagen, precio, stock, destacado } = req.body;

	const product = new Product({
		nombre,
		descripcion,
		imagen,
		precio,
		stock,
		destacado,
	});
	try {
		await product.save();
		res.json({
			status: '1',
			msg: 'producto guardado.',
		});
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando operacion.',
		});
	}
};

exports.putEditProduct = async (req, res) => {
	const product = new Product(req.body);
	try {
		const productUpdated = await Product.updateOne(
			{ _id: req.body._id },
			product
		);

		// console.log(productUpdated);

		if (productUpdated.matchedCount > 0) {
			res.json({
				status: '1',
				msg: 'Producto actualizado',
			});
		} else {
			res.json({
				status: '2',
				msg: 'Producto no encontrado',
			});
		}
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};
exports.deleteProduct = async (req, res) => {
	try {
		const productDeleted = await Product.deleteOne({ _id: req.params.id });

		// console.log(productDeleted);

		if (productDeleted.deletedCount > 0) {
			res.json({
				status: '1',
				msg: 'Producto eliminado',
			});
		} else {
			res.json({
				status: '2',
				msg: 'Producto no encontrado',
			});
		}
	} catch (error) {
		res.status(400).json({
			status: '0',
			msg: 'Error procesando la operacion',
		});
	}
};

exports.getFeaturedProducts = async (req, res) => {
	const products = await Product.find({ destacado: true });
	res.json(products);
};
