var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Visite = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    ordonnance: {
        type: Schema.Types.ObjectId,
        ref: 'Ordonnance',
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    time:{
        type:Date,
        default: Date.time,
    },
    Message:{
        type: String
    },

    statusAppointment:{
        type:Boolean,
        default:false,
    },
    typeVisite: {
        type: String,
        required: true
    },
   
    NbreVisiteEffectuer: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Visite', Visite);