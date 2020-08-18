const Flight=require('../models/flights');
const Ticket=require('../models/ticket');

const names= [
    {
        airline:'Janet Airline',
        airport:'DEN',
        flightNo:2542,
        departs:2020-08-07,
        destinations: []
    },
    {
        airline:'Alex Airline',
        airport:'TOR',
        flightNo:2562,
        departs:2020-09-07,
        destinations: []
    }

];


const index =(req,res) =>{
    Flight.find({}, function(err,flights){
        if (err) return err;
        if(!flights.length){
            names.forEach((n) =>{
                // let newDepFormat=n.departs;
                let flight= new Flight ({airline:n.airline, airport:n.airport, flightNo:n.flightNo, depart:n.departs, destinations:n.destinations});
                flight.save();
            })
        }
        res.render ('flights/index', {title: 'List of All Flights', flights:flights});
    })
}
   
const newFlightForm=(req, res) => {
    res.render ('flights/newflight', {title: 'Add A New Flight'});
}

const addFlight=(req, res) => {
    // console.log(req.body);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const newItem=new Flight(req.body);
    // console.log(newItem);
    newItem.save(function(err){
        if (err) return res.redirect('/flights/newflight');
        res.redirect('/flights');
    })
}

const show=(req,res) =>{
    Flight.findById(req.params.id, function(err,thisFlight){
        Ticket.find({flight: thisFlight._id}, function (err, thisTickets){
            res.render('flights/show', {title: 'Flight Details', thisFlight, thisTickets});
        })
    })
}

const addDestinations=(req,res) =>{
    Flight.findById(req.params.id, function(err,thisFlight){
        thisFlight.destinations.push(req.body);
        thisFlight.save(function(err){           
            res.redirect(`/flights/${thisFlight._id}`);
        })
    })
}

module.exports={
    index:index,
    newFlightForm: newFlightForm,
    addFlight: addFlight,
    show:show,
    addDestinations: addDestinations
}