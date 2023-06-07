const spectatorController = require('./../controllers/spectator');

const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de sectores

router.get('/get-spectators', spectatorController.getSpectators);
router.get('/get-spectator/:id', spectatorController.getSpectator);
router.post('/add-spectator', spectatorController.postCreateSpectator);

//exportamos el modulo de rutas
module.exports = { router: router };
