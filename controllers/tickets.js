const Ticket=require('../models/ticket');

const newTicketForm=(req,res) =>{
    let flightID=req.params.id;
    res.render ('tickets/new', {title: 'Add A New Ticket', flightID});
}

const addTicket=(req,res) =>{
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const newItem=new Ticket(req.body);
    newItem.flight=req.params.id;
    newItem.save(function(err){
        if (err) return res.redirect(`/flights/${req.params.id}/tickets/new`);
        res.redirect(`/flights/${req.params.id}`);
    })
}

module.exports={
    newTicketForm,
    addTicket
}