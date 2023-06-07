const ticketController = require('./../controllers/ticket');

const express = require('express');
const router = express.Router();

router.get('/get-tickets', ticketController.getTickets);
router.post('/add-ticket', ticketController.postCreateTicket);
router.put('/edit-ticket', ticketController.putEditTicket);
router.delete('/delete-ticket/:id', ticketController.deleteTicket);
router.get(
	'/get-spectator-category/:category',
	ticketController.getTicketByCategory
);

//exportamos el modulo de rutas
module.exports = { router: router };
