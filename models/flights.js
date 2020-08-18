const mongoose = require('mongoose');
const Schema=mongoose.Schema;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var addOneYear=yyyy+1;
let aYearFromToday = addOneYear+"-"+mm+"-"+dd;

const destinationSchema= new Schema({
    airport:{
        type:String,
        default: 'n/a'
    },
    arrival:{
        type: Date,
        default: aYearFromToday
    }
})

const flightSchema=new Schema({
    airline:{
        type:String,
        default: 'n/a'
    },
    airport: {
        type:String,
        default:'Den'
    },
    flightNo:{
        type: Number,
        default: 0
    },
    departs:{
        type: Date,
        default: aYearFromToday
    },
    destinations:[destinationSchema]

});

module.exports= mongoose.model('flight', flightSchema);