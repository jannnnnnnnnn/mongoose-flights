var express = require('express');
var router = express.Router();
const flightsCtrl=require('../controllers/flights');
const ticketsCtrl=require('../controllers/tickets');


router.get('/', flightsCtrl.index);

router.get('/newflight',flightsCtrl.newFlightForm);

router.post('/newflight',flightsCtrl.addFlight);

router.get('/:id',flightsCtrl.show);
router.post('/:id/desn', flightsCtrl.addDestinations);

router.get('/:id/tickets/new', ticketsCtrl.newTicketForm);
router.post('/:id/tickets/new', ticketsCtrl.addTicket);


module.exports = router;

//question: why in show.ejs, clicking add flights goes to add ticket page
