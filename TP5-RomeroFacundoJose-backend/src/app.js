const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { mongoose } = require('./util/db');
const app = express();

const transactionRouter = require('./routes/transaction');
const productRouter = require('./routes/product');
const spectatorRouter = require('./routes/spectator');
const ticketRouter = require('./routes/ticket');

router = express.Router();

require('dotenv').config();
//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

//Cargamos el modulo de direccionamiento de rutas
//app.use('/api/agente', require('./routes/agente.route.js'));
//app.use('/api/sector', require('./routes/sector.route'));
//setting

app.use(morgan('dev'));

app.use('/api/productos', productRouter.router);
app.use('/api/transacciones', transactionRouter.router);
app.use('/api/espectadores', spectatorRouter.router);
app.use('/api/tickets', ticketRouter.router);

// app.use('/api/sector', sectorRouter.router);

app.set('port', process.env.PORT || 8080);
//starting the server
app.listen(app.get('port'), () => {
	console.log(`Server started on port`, app.get('port'));
});
